//
//  MonthlyViewController.h
//  App
//
//  Created by James Hall on 1/23/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "MGCMonthPlannerEKViewController.h"
#import "TrainerAvailabilityManager.h"


@interface MonthViewController : MGCMonthPlannerEKViewController <CalendarViewControllerNavigation>

@property (nonatomic, strong) id<CalendarViewControllerDelegate> delegate;

@end
