//
//  TrainerAvailabilityManager.m
//  App
//
//  Created by James Hall on 1/23/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "TrainerAvailabilityManager.h"
#import "MonthViewController.h"
#import "DayViewController.h"
#import "WeekViewController.h"
#import <React/RCTLog.h>
#import "NSCalendar+MGCAdditions.h"
#import "AppDelegate.h"

typedef enum : NSUInteger
{
  CalendarViewDayType = 0,
  CalendarViewWeekType  = 1,
  CalendarViewMonthType = 2,
  CalendarViewYearType
} CalendarViewType;


@interface TrainerAvailabilityManager ()

@property (nonatomic, strong) NSDateFormatter *dateFormatter;
@property (nonatomic) EKCalendarChooser *calendarChooser;
@property (nonatomic) BOOL firstTimeAppears;
@property (nonatomic, strong) UISegmentedControl *calendarControl;
@property (nonatomic, strong) UIView *containerView;
@property (nonatomic, strong) UIButton *btnHelp;
@property (nonatomic, strong) UIButton *btnNew;

@property (nonatomic, strong) MonthViewController *monthViewController;
@property (nonatomic, strong) DayViewController *dayViewController;
@property (nonatomic, strong) WeekViewController *weekViewController;

@property (nonatomic,strong) NSMutableArray *availabilites;
@property (nonatomic,strong) NSMutableArray *appointments;

@end


@implementation TrainerAvailabilityManager

#pragma mark - UIViewController

- (id)init
{
  if (self = [super init]) {
    _eventStore = nil;//[[EKEventStore alloc]init];
  }
  return self;
}


- (id)initWithCoder:(NSCoder *)aDecoder
{
  if (self = [super initWithCoder:aDecoder]) {
    _eventStore = nil;//[[EKEventStore alloc]init];
  }
  return self;
}

- (void)viewDidLoad
{
  [super viewDidLoad];
  
  NSString *calID = [[NSUserDefaults standardUserDefaults]stringForKey:@"calendarIdentifier"];
  self.calendar = [NSCalendar mgc_calendarFromPreferenceString:calID];
  
  NSString *calendarIdentifier = [[NSUserDefaults standardUserDefaults] objectForKey:@"fitspot_appointments_calendar"];
  
  if(calendarIdentifier == nil
     || ([self.eventStore calendarWithIdentifier:calendarIdentifier] == nil && calendarIdentifier != nil)
     ){
    _eventCalendar = [EKCalendar calendarForEntityType:EKEntityTypeEvent eventStore:_eventStore];
    self.eventCalendar.title = @"Fitspot Appointments";
    self.eventCalendar.CGColor = [UIColor colorWithRed:95.0/255.0 green:177.0/255.0 blue:61.0/255.0 alpha:1.0].CGColor;
    NSArray *sources =  self.eventStore.sources;

    for (EKSource *source in sources) {
      if(source.sourceType == EKSourceTypeLocal){
        self.eventCalendar.source = source;
      }
    }
    NSError *e = nil;
    [self.eventStore saveCalendar:self.eventCalendar commit:true error:&e];
    if(e != nil){
      UIAlertController * alert = [UIAlertController alertControllerWithTitle:@"Calendar Error" message:@"Could not save calendar" preferredStyle:UIAlertControllerStyleAlert];
      UIAlertAction *ok = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
      [alert addAction:ok];
      [self presentViewController:alert animated:YES completion:nil];
    }else{
      [[NSUserDefaults standardUserDefaults] setObject:self.eventCalendar.calendarIdentifier forKey:@"fitspot_appointments_calendar"];
    }
  }
  
  
  NSUInteger firstWeekday = [[NSUserDefaults standardUserDefaults]integerForKey:@"firstDay"];
  if (firstWeekday != 0) {
    self.calendar.firstWeekday = firstWeekday;
  } else {
    [[NSUserDefaults standardUserDefaults]registerDefaults:@{ @"firstDay" : @(self.calendar.firstWeekday) }];
  }
  
  self.dateFormatter = [NSDateFormatter new];
  self.dateFormatter.calendar = self.calendar;
  

  CalendarViewController *controller = [self controllerForViewType:CalendarViewMonthType];
  
  self.calendarControl = [[UISegmentedControl alloc] initWithItems:@[@"Daily View",@"Weekly View",@"Month View"]];
  self.calendarControl.frame = CGRectMake((self.view.frame.size.width -250)/2, 12, 250, 30);
  self.calendarControl.tintColor = [UIColor colorWithRed:95.0/255.0 green:177.0/255.0 blue:61.0/255.0 alpha:1.0];
  [self.calendarControl addTarget:self action:@selector(segmentControlDidChange:) forControlEvents: UIControlEventValueChanged];
  self.calendarControl.selectedSegmentIndex = 2;
  [self.view addSubview:self.calendarControl];
  
  self.btnNew = [UIButton buttonWithType:UIButtonTypeCustom];
  [self.btnNew addTarget:self
             action:@selector(aMethod:)
   forControlEvents:UIControlEventTouchUpInside];
  [self.btnNew setImage:[UIImage imageNamed:@"Help"] forState:UIControlStateNormal];
  [self.btnNew setTitle:@"Show View" forState:UIControlStateNormal];
  self.btnNew.frame = CGRectMake(self.view.frame.size.width - 50, 16, 20, 20.0);
  [self.view addSubview:self.btnNew];
  
  self.btnHelp = [UIButton buttonWithType:UIButtonTypeCustom];
  [self.btnHelp addTarget:self
                   action:@selector(aMethod:)
         forControlEvents:UIControlEventTouchUpInside];
  [self.btnHelp setImage:[UIImage imageNamed:@"Help"] forState:UIControlStateNormal];
  [self.btnHelp setTitle:@"Show View" forState:UIControlStateNormal];
  self.btnHelp.frame = CGRectMake(12, 16, 20, 20.0);
  [self.view addSubview:self.btnHelp];
  


  CGRect currentFrame = self.view.bounds;
  currentFrame.origin.y = (self.calendarControl.frame.origin.y + self.calendarControl.frame.size.height + 6);
  
  self.containerView = [[UIView alloc]initWithFrame:currentFrame];
  [self.view addSubview:self.containerView];

  
  [self addChildViewController:controller];
  [self.containerView addSubview:controller.view];
  controller.view.frame = self.containerView.bounds;
  [controller didMoveToParentViewController:self];
  
  self.calendarViewController = controller;
  self.firstTimeAppears = YES;
}

- (void)viewDidAppear:(BOOL)animated
{
  [super viewDidAppear:animated];
  
  if (self.firstTimeAppears) {
    NSDate *date = [self.calendar mgc_startOfWeekForDate:[NSDate date]];
    [self.calendarViewController moveToDate:date animated:NO];
    self.firstTimeAppears = NO;
  }
}

-(void)setAvailabilities:(NSMutableArray *)availabilities{
  self.availabilites = availabilities;
  if(self.monthViewController != nil){
    self.monthViewController.availabilities = self.availabilites;
  }
}
-(void)setSessions:(NSArray *)sessions{
  
}


- (void)segmentControlDidChange:(UISegmentedControl *)segment
{
  [self switchControllers:segment.selectedSegmentIndex withDate:nil];
}

- (void)didReceiveMemoryWarning
{
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator
{
  [super viewWillTransitionToSize:size withTransitionCoordinator:coordinator];
  UINavigationController *nc = (UINavigationController*)self.presentedViewController;
  if (nc) {
    BOOL hide = (self.traitCollection.verticalSizeClass == UIUserInterfaceSizeClassRegular && self.traitCollection.horizontalSizeClass == UIUserInterfaceSizeClassRegular);
    UIBarButtonItem *doneButton = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(dismissSettings:)];
    nc.topViewController.navigationItem.rightBarButtonItem = hide ? nil : doneButton;
  }
}

#pragma mark - Private

- (DayViewController*)dayViewController
{
  if (_dayViewController == nil) {
    _dayViewController = [[DayViewController alloc]initWithEventStore:self.eventStore];
    _dayViewController.calendar = self.calendar;
    _dayViewController.showsWeekHeaderView = YES;
    _dayViewController.delegate = self;
    _dayViewController.dayPlannerView.eventCoveringType = MGCDayPlannerCoveringTypeComplex;
  }
  return _dayViewController;
}

- (WeekViewController*)weekViewController
{
  if (_weekViewController == nil) {
    _weekViewController = [[WeekViewController alloc]initWithEventStore:self.eventStore];
    _weekViewController.calendar = self.calendar;
    _weekViewController.delegate = self;
  }
  return _weekViewController;
}

- (MonthViewController*)monthViewController
{
  if (_monthViewController == nil) {
    _monthViewController = [[MonthViewController alloc]initWithEventStore:self.eventStore];
//    _monthViewController = [[MonthViewController alloc] init];
    _monthViewController.calendar = self.calendar;
    _monthViewController.delegate = self;
  }
  return _monthViewController;
}


- (CalendarViewController*)controllerForViewType:(CalendarViewType)type
{
  switch (type)
  {
    case CalendarViewDayType:  return self.dayViewController;
    case CalendarViewWeekType:  return self.weekViewController;
    case CalendarViewMonthType: return self.monthViewController;
//    case CalendarViewYearType:  return self.yearViewController;
  }
  return nil;
}

-(void)moveToNewController:(CalendarViewController*)newController atDate:(NSDate*)date
{
  [self.calendarViewController willMoveToParentViewController:nil];
  [self addChildViewController:newController];
  
  [self transitionFromViewController:self.calendarViewController toViewController:newController duration:.5 options:UIViewAnimationOptionTransitionFlipFromLeft animations:^
   {
     newController.view.frame = self.view.bounds;
     newController.view.hidden = YES;
   } completion:^(BOOL finished)
   {
     [self.calendarViewController removeFromParentViewController];
     [newController didMoveToParentViewController:self];
     self.calendarViewController = newController;
     [newController moveToDate:date animated:NO];
     newController.view.hidden = NO;
   }];
}

#pragma mark - Actions

-(void)switchControllers:(CalendarViewType)viewType withDate:(NSDate *)date
{
  if(date == nil){
    date = [self.calendarViewController centerDate];
  }
  
  CalendarViewController *controller = [self controllerForViewType:viewType];
  [self moveToNewController:controller atDate:date];

}

- (IBAction)showToday:(id)sender
{
  [self.calendarViewController moveToDate:[NSDate date] animated:YES];
}

- (IBAction)nextPage:(id)sender
{
  [self.calendarViewController moveToNextPageAnimated:YES];
}

- (IBAction)previousPage:(id)sender
{
  [self.calendarViewController moveToPreviousPageAnimated:YES];
}

- (IBAction)showCalendars:(id)sender
{
  if ([self.calendarViewController respondsToSelector:@selector(visibleCalendars)]) {
    self.calendarChooser = [[EKCalendarChooser alloc]initWithSelectionStyle:EKCalendarChooserSelectionStyleMultiple displayStyle:EKCalendarChooserDisplayAllCalendars eventStore:self.eventStore];
    self.calendarChooser.delegate = self;
    self.calendarChooser.showsDoneButton = YES;
    self.calendarChooser.selectedCalendars = self.calendarViewController.visibleCalendars;
  }
  
  if (self.calendarChooser) {
    UINavigationController *nc = [[UINavigationController alloc]initWithRootViewController:self.calendarChooser];
    self.calendarChooser.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemEdit target:self action:@selector(calendarChooserStartEdit)];
    nc.modalPresentationStyle = UIModalPresentationPopover;
    
    [self showDetailViewController:nc sender:self];
    
    UIPopoverPresentationController *popController = nc.popoverPresentationController;
    popController.barButtonItem = (UIBarButtonItem*)sender;
  }
}

- (void)calendarChooserStartEdit
{
  self.calendarChooser.editing = YES;
  self.calendarChooser.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(calendarChooserEndEdit)];
}

- (void)calendarChooserEndEdit
{
  self.calendarChooser.editing = NO;
  self.calendarChooser.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemEdit target:self action:@selector(calendarChooserStartEdit)];
}


#pragma mark - CalendarViewControllerDelegate

- (void)calendarViewController:(CalendarViewController*)controller didShowDate:(NSDate*)date
{
    [self.dateFormatter setDateFormat:@"MMMM yyyy"];
  
  NSString *str = [self.dateFormatter stringFromDate:date];
//  self.currentDateLabel.text = str;
//  [self.currentDateLabel sizeToFit];
}

- (void)calendarViewController:(CalendarViewController*)controller didSelectEvent:(EKEvent*)event
{
  NSLog(@"calendarViewController:didSelectEvent");
}

- (void)calendarViewController:(CalendarViewController*)controller didSelectDay:(NSDate *)date
{
  [self.calendarControl setSelectedSegmentIndex:0];
  [self switchControllers:CalendarViewDayType withDate:date];
  
}
#pragma mark - MGCDayPlannerEKViewControllerDelegate

- (UINavigationController*)navigationControllerForEKEventViewController
{
  //    if (!isiPad) {
  //        return self.navigationController;
  //    }
  return nil;
}


#pragma mark - EKCalendarChooserDelegate

- (void)calendarChooserSelectionDidChange:(EKCalendarChooser*)calendarChooser
{
  if ([self.calendarViewController respondsToSelector:@selector(setVisibleCalendars:)]) {
    self.calendarViewController.visibleCalendars = calendarChooser.selectedCalendars;
  }
}

- (void)calendarChooserDidFinish:(EKCalendarChooser*)calendarChooser
{
  [self dismissViewControllerAnimated:YES completion:nil];
}


@end
