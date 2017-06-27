//
//  TrainerAvailabilityManager.h
//  App
//
//  Created by James Hall on 1/23/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <EventKitUI/EventKitUI.h>
#import <React/RCTBridgeModule.h>

@protocol AvailabilityManagerDelegate <NSObject>

@required
-(void)createNewEvent;
-(void)editEvent:(EKEvent *)event;

@end

@protocol CalendarViewControllerNavigation <NSObject>

@property (nonatomic, readonly) NSDate* centerDate;

- (void)moveToDate:(NSDate*)date animated:(BOOL)animated;
- (void)moveToNextPageAnimated:(BOOL)animated;
- (void)moveToPreviousPageAnimated:(BOOL)animated;

@optional

@property (nonatomic) NSSet* visibleCalendars;

@end


typedef  UIViewController<CalendarViewControllerNavigation> CalendarViewController;


@protocol CalendarViewControllerDelegate <NSObject>

@optional

- (void)calendarViewController:(CalendarViewController*)controller didShowDate:(NSDate*)date;
- (void)calendarViewController:(CalendarViewController*)controller didSelectEvent:(EKEvent*)event;
- (void)calendarViewController:(CalendarViewController*)controller didSelectDay:(NSDate*)date;

@end

@interface TrainerAvailabilityManager : UIViewController<CalendarViewControllerDelegate, EKCalendarChooserDelegate>

@property (nonatomic) CalendarViewController* calendarViewController;
@property (nonatomic,strong) NSObject<AvailabilityManagerDelegate> *availabilityManager;

@property (nonatomic) NSCalendar *calendar;
@property (nonatomic) EKCalendar *eventCalendar;
@property (nonatomic) EKEventStore *eventStore;

-(void)setAvailabilities:(NSMutableArray *)availabilities;
-(void)setSessions:(NSMutableArray *)sessions;
@end
