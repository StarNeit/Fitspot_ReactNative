//
//  TrainerCalendarManager.m
//  App
//
//  Created by James Hall on 1/23/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "TrainerCalendarManager.h"
#import "TrainerAvailabilityManager.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>


@interface TrainerCalendarManager ()
@property (nonatomic, strong) TrainerAvailabilityManager *myManager;

@end

@implementation TrainerCalendarManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

//RCT_EXPORT_VIEW_PROPERTY(availabilityItems, false)
//RCT_EXPORT_VIEW_PROPERTY(appointmentItems, false)
RCT_CUSTOM_VIEW_PROPERTY(appointmentItems, NSMutableArray, TrainerCalendarManager){
  NSLog(@"assigned AppointmentItmes");
  NSMutableArray *appointments = [NSMutableArray arrayWithCapacity:[json count]];
  static NSDateFormatter *dateFormatter = nil;
  if (dateFormatter == nil) {
    dateFormatter = [NSDateFormatter new];
    dateFormatter.dateFormat = @"yyyy-MM-DD HH:mm:ss";
    
  }
  
  for(int i = 0; i < [json count]; i++){
    EKEvent *newEvent = [EKEvent eventWithEventStore:self.myManager.eventStore];
    NSDictionary *item = [json objectAtIndex:i];
    newEvent.title = @"Availability";
    newEvent.startDate = [dateFormatter dateFromString:[item objectForKey:@"dateStart"]];
    newEvent.endDate = [dateFormatter dateFromString:[item objectForKey:@"dateEnd"]];
    newEvent.location = [NSString stringWithFormat:@"%@ %@ %@ %@",
                         [item objectForKey:@"address"],
                         [item objectForKey:@"city"],
                         [item objectForKey:@"state"],
                         [item objectForKey:@"zipcode"]];
    [appointments addObject:newEvent];
  }
  
  [self.myManager setAvailabilities:appointments];
//  NSObject *jsons = json;
//  int i = 0;
//  i++;
}

- (UIView *)view
{
  self.myManager = [[TrainerAvailabilityManager alloc] init];
  self.myManager.availabilityManager = self;
  
  return [self.myManager view];
}


-(void)editEvent:(EKEvent *)event{
  
}

-(void)createNewEvent{
//  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
//                                               body:@{@"name": eventName}];
}

@end
