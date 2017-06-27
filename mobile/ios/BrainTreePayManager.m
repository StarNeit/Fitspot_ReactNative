//
//  BrainTreePayViewController.m
//  App
//
//  Created by James Hall on 1/12/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "BrainTreePayManager.h"
#import "BraintreeCore.h"
#import "BraintreeDropIn.h"
#import <React/RCTLog.h>
#import "AppDelegate.h"

@interface BrainTreePayManager ()

@property (nonatomic,strong) NSString *nonce;

@end

@implementation BrainTreePayManager

RCT_EXPORT_MODULE();

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/



RCT_REMAP_METHOD(showDropIn,
                 clientKey:(NSString *)clientTokenOrTokenizationKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"Pretending to create an event ");
  AppDelegate * del = [[UIApplication sharedApplication] delegate];
  BTDropInRequest *request = [[BTDropInRequest alloc] init];
  BTDropInController *dropIn = [[BTDropInController alloc] initWithAuthorization:clientTokenOrTokenizationKey request:request handler:^(BTDropInController * _Nonnull controller, BTDropInResult * _Nullable result, NSError * _Nullable error) {

    if (error != nil) {

      resolve(@[@"error",error.localizedFailureReason]);
    } else if (result.cancelled) {
      resolve(@[@"error",@"cancelled"]);
    } else {
      
      NSString *paymentType = [self getCardName:result.paymentOptionType];
      
      NSString *desc = result.paymentDescription;
      
      NSString *retString = [NSString stringWithFormat:@"%@ %@",paymentType,desc];
      
        resolve(@[result.paymentMethod.nonce,retString]);
    }
    [[del window].rootViewController dismissViewControllerAnimated:NO completion:nil];
  }];
  dispatch_async(dispatch_get_main_queue(), ^{
    // Call UI related operations
    [[del window].rootViewController presentViewController:dropIn animated:YES completion:nil];
  });
  
  
}

-(NSString *)getCardName:(BTUIKPaymentOptionType) type{
  NSString *paymentType = @"";
  switch(type){
    case BTUIKPaymentOptionTypeAMEX:
      paymentType = @"AMEX";
      break;
    case BTUIKPaymentOptionTypeDinersClub:
      paymentType = @"DINERS CLUB";
      break;
    case BTUIKPaymentOptionTypeDiscover:
      paymentType = @"DISCOVER";
      break;
    case BTUIKPaymentOptionTypeMasterCard:
      paymentType = @"MASTERCARD";
      break;
    case BTUIKPaymentOptionTypeVisa:
      paymentType = @"VISA";
      break;
    case BTUIKPaymentOptionTypeJCB:
      paymentType = @"JCB";
      break;
    case BTUIKPaymentOptionTypeLaser:
      paymentType = @"LASER";
      break;
    case BTUIKPaymentOptionTypeMaestro:
      paymentType = @"MAESTRO";
      break;
    case BTUIKPaymentOptionTypeUnionPay:
      paymentType = @"UNION";
      break;
    case BTUIKPaymentOptionTypeSolo:
      paymentType = @"SOLO";
      break;
    case BTUIKPaymentOptionTypeSwitch:
      paymentType = @"SWITCH";
      break;
    case BTUIKPaymentOptionTypeUKMaestro:
      paymentType = @"UKMAESTRO";
      break;
    case BTUIKPaymentOptionTypePayPal:
      paymentType = @"PAYPAL";
      break;
    case BTUIKPaymentOptionTypeCoinbase:
      paymentType = @"COINBASE";
      break;
    case BTUIKPaymentOptionTypeVenmo:
      paymentType = @"VENMO";
      break;
    case BTUIKPaymentOptionTypeApplePay:
      paymentType = @"APPLY PAY";
      break;
    default:
      paymentType =@"";
      break;
  }
  
  return paymentType;

}

RCT_REMAP_METHOD(getPaymentInfo,
                 token:(NSString *)token
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [BTDropInResult fetchDropInResultForAuthorization:token handler:^(BTDropInResult * _Nullable result, NSError * _Nullable error) {
    
    NSString *paymentType = [self getCardName:result.paymentOptionType];
    
           NSString *desc = result.paymentDescription;
      
      NSString *retString = [NSString stringWithFormat:@"%@ %@",paymentType,desc];
    
      if (error != nil) {
        NSLog(@"ERROR");
      } else {
        if (error != nil) {
          reject(@"no_nonce", @"There was no nonce", nil);
        } else {
          resolve(@[retString]);
        }
        
      }
      
      
  }];

}
@end
