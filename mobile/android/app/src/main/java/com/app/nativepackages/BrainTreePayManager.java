package com.app.nativepackages;

import android.app.Activity;
import android.content.Intent;

import com.braintreepayments.api.dropin.DropInActivity;
import com.braintreepayments.api.dropin.DropInRequest;
import com.braintreepayments.api.dropin.DropInResult;
import com.braintreepayments.api.dropin.utils.PaymentMethodType;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import timber.log.Timber;

/**
 * Created by aldoreyes on 2/10/17.
 */

public class BrainTreePayManager extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final int REQUEST_CODE = 3001;
    private Promise btPromise;

    public BrainTreePayManager(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "BrainTreePayManager";
    }

    @ReactMethod
    public void showDropIn(String clientKey, final Promise promise){
        Activity currentActivity = getCurrentActivity();

        btPromise = promise;

        if (currentActivity == null) {
            btPromise.reject("no_nonce", "There was no nonce");
            return;
        }

        DropInRequest dropInRequest = new DropInRequest()
                .clientToken(clientKey);

        currentActivity.startActivityForResult(dropInRequest.getIntent(currentActivity), REQUEST_CODE);
    }

    @ReactMethod
    public void getPaymentInfo(String token, final Promise promise){
        DropInResult.fetchDropInResult(getCurrentActivity(), token, new DropInResult.DropInResultListener() {
            @Override
            public void onError(Exception exception) {
                promise.reject("no_nonce", exception.getMessage());
            }

            @Override
            public void onResult(DropInResult result) {
                if(result.getPaymentMethodType() != null){
                    String paymentType = "";
                    PaymentMethodType paymentMethodType = result.getPaymentMethodType();
                    if (paymentMethodType == PaymentMethodType.AMEX){
                        paymentType = "AMEX";
                    }else if(paymentMethodType == PaymentMethodType.DINERS){
                        paymentType = "DINERS CLUB";
                    }else if(paymentMethodType == PaymentMethodType.DISCOVER){
                        paymentType = "DISCOVER";
                    }else if(paymentMethodType == PaymentMethodType.MASTERCARD){
                        paymentType = "MASTERCARD";
                    }else if(paymentMethodType == PaymentMethodType.VISA){
                        paymentType = "VISA";
                    }else if(paymentMethodType == PaymentMethodType.JCB){
                        paymentType = "JCB";
                    }else if(paymentMethodType == PaymentMethodType.MAESTRO){
                        paymentType = "MAESTRO";
                    }else if(paymentMethodType == PaymentMethodType.UNIONPAY){
                        paymentType = "UNION";
                    }else if(paymentMethodType == PaymentMethodType.PAYPAL){
                        paymentType = "PAYPAL";
                    }else if(paymentMethodType == PaymentMethodType.ANDROID_PAY){
                        paymentType = "ANDROID PAY";
                    }
                    // use the result to update your UI and send the payment method nonce to your server
                    WritableArray array = new WritableNativeArray();
                    array.pushString(String.format("%s %s", paymentType, result.getPaymentMethodNonce().getDescription()));

                    promise.resolve(array);
                }else{
                    promise.reject("no_nonce", "No payment method selected");
                }


            }
        });
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                DropInResult result = data.getParcelableExtra(DropInResult.EXTRA_DROP_IN_RESULT);

                WritableArray array = new WritableNativeArray();
                array.pushString(result.getPaymentMethodNonce().getNonce());
                btPromise.resolve(array);

            } else if (resultCode == Activity.RESULT_CANCELED) {
                // the user canceled
                btPromise.reject("no_nonce", "There was no nonce");
            } else {
                // handle errors here, an exception may be available in
                Exception error = (Exception) data.getSerializableExtra(DropInActivity.EXTRA_ERROR);
                btPromise.reject("no_nonce", error.getMessage());
                Timber.e(error.toString());
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}

