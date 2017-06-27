//
//  WeekViewController.m
//  CalendarDemo - Graphical Calendars Library for iOS
//
//  Copyright (c) 2014-2015 Julien Martin. All rights reserved.
//

#import "WeekViewController.h"
#import "MGCDateRange.h"
#import "NSCalendar+MGCAdditions.h"
#import "NSAttributedString+MGCAdditions.h"
#import "Constant.h"


@implementation WeekViewController

@dynamic delegate;

#pragma mark - UIViewController

- (void)viewDidLoad
{
  [super viewDidLoad];
  
  self.dayPlannerView.backgroundColor = [UIColor clearColor];
  self.dayPlannerView.backgroundView = [UIView new];
  self.dayPlannerView.backgroundView.backgroundColor = [UIColor whiteColor];
  
  if (isiPad) {
    //NSLog(@"---------------- iPAD ------------------");
    self.dayPlannerView.dateFormat = @"eee\nd MMM";
    self.dayPlannerView.dayHeaderHeight = 50;
  }
  else{
    //NSLog(@"---------------- iPhone ------------------");
    self.dayPlannerView.dateFormat = @"eee\nd \nMMM";
    self.dayPlannerView.dayHeaderHeight = 60;
    [self.dayPlannerView setEventIndicatorDotColor:[UIColor colorWithRed:95.0/255 green:177.0/255 blue:61/255 alpha:1.0]];
  }
}

#pragma mark - MGCDayPlannerViewController


- (BOOL)dayPlannerView:(MGCDayPlannerView*)view canCreateNewEventOfType:(MGCEventType)type atDate:(NSDate*)date
{
  NSDateComponents *comps = [self.calendar components:NSCalendarUnitWeekday fromDate:date];
  return comps.weekday != 1;
}

- (void)dayPlannerView:(MGCDayPlannerView*)view didScroll:(MGCDayPlannerScrollType)scrollType
{
  NSDate *date = [view dateAtPoint:view.center rounded:YES];
  if (date && [self.delegate respondsToSelector:@selector(calendarViewController:didShowDate:)]) {
    [self.delegate calendarViewController:self didShowDate:date];
  }
}

- (BOOL)dayPlannerView:(MGCDayPlannerView*)view canMoveEventOfType:(MGCEventType)type atIndex:(NSUInteger)index date:(NSDate*)date toType:(MGCEventType)targetType date:(NSDate*)targetDate
{
  NSDateComponents *comps = [self.calendar components:NSCalendarUnitWeekday fromDate:targetDate];
  return (comps.weekday != 1 && comps.weekday != 7);
}

- (NSAttributedString*)dayPlannerView:(MGCDayPlannerView*)view attributedStringForTimeMark:(MGCDayPlannerTimeMark)mark time:(NSTimeInterval)ti
{
  BOOL rounded = (mark != MGCDayPlannerTimeMarkCurrent);
  BOOL minutesOnly = (mark == MGCDayPlannerTimeMarkFloating);
  
  NSString *timeString = @"";
  NSTimeInterval time = ti;
  
  if (rounded) {
    time = roundf(ti / (15 * 60)) * (15 * 60);
  }
  
  int hour = (int)(time / 3600) % 24;
  int minutes = ((int)time % 3600) / 60;
  
  if (minutesOnly) {
    timeString = [NSString stringWithFormat:@":%02d", minutes];
  }else{
    timeString = [NSString stringWithFormat:@"%02d:%02d", hour, minutes];
  }
  
  if(hour >= 12){
    if(hour > 12){
      hour = hour - 12;
    }
    
    if (minutesOnly) {
      timeString = [NSString stringWithFormat:@":%02d", minutes];
    }else if(mark == MGCDayPlannerTimeMarkCurrent){
      timeString = [NSString stringWithFormat:@"%02d:%02d PM", hour,minutes];
    }else{
      timeString = [NSString stringWithFormat:@"%02d PM", hour];
    }
  }else{
    if(hour == 0){
      hour = 12;
    }
    if (minutesOnly) {
      timeString = [NSString stringWithFormat:@":%02d", minutes];
    }else if(mark == MGCDayPlannerTimeMarkCurrent){
      timeString = [NSString stringWithFormat:@"%02d:%02d AM", hour,minutes];
    }else{
      timeString = [NSString stringWithFormat:@"%02d AM", hour];
    }
  }
  
  
  NSMutableParagraphStyle *style = [NSMutableParagraphStyle new];
  style.alignment = NSTextAlignmentRight;
  
  
  UIColor *foregroundColor = (mark == MGCDayPlannerTimeMarkCurrent ? [UIColor redColor] : [UIColor lightGrayColor]);
  NSAttributedString *attrStr = [[NSAttributedString alloc]initWithString:timeString attributes:@{ NSFontAttributeName: [UIFont fontWithName:@"DaytonaW01-Regular" size:14], NSForegroundColorAttributeName: foregroundColor, NSParagraphStyleAttributeName: style }];
  
  return attrStr;
}

- (NSAttributedString*)dayPlannerView:(MGCDayPlannerView *)view attributedStringForDayHeaderAtDate:(NSDate *)date
{
  
  static NSDateFormatter *dateFormatter = nil;
  if (dateFormatter == nil) {
    dateFormatter = [NSDateFormatter new];
    dateFormatter.dateFormat = @"eee\n dd";
  }
  
  NSString *dayStr = [dateFormatter stringFromDate:date];
  
  UIFont *font = [UIFont fontWithName:@"DaytonaW01-Light" size:12.0f];
  NSMutableAttributedString *attrStr = [[NSMutableAttributedString alloc]initWithString:dayStr attributes:@{ NSFontAttributeName: font }];
  
  if ([self.calendar mgc_isDate:date sameDayAsDate:[NSDate date]]) {
    UIFont *boldFont = [UIFont fontWithName:@"DaytonaW01-Regular" size:12.0f];
    
    MGCCircleMark *mark = [MGCCircleMark new];
    mark.yOffset = boldFont.descender - mark.margin;
    
    NSUInteger dayStringStart = [dayStr rangeOfString:@" "].location + 1;
    [attrStr addAttributes:@{ NSFontAttributeName: boldFont, NSForegroundColorAttributeName: [UIColor whiteColor], MGCCircleMarkAttributeName: mark } range:NSMakeRange(dayStringStart, dayStr.length - dayStringStart)];
    
    [attrStr processCircleMarksInRange:NSMakeRange(0, attrStr.length)];
  }
  
  NSMutableParagraphStyle *para = [NSMutableParagraphStyle new];
  para.alignment = NSTextAlignmentCenter;
  [attrStr addAttribute:NSParagraphStyleAttributeName value:para range:NSMakeRange(0, attrStr.length)];
  
  return attrStr;
}

- (NSInteger)dayPlannerView:(MGCDayPlannerView *)view numberOfDimmedTimeRangesAtDate:(NSDate *)date
{
  if (!self.showDimmedTimeRanges) return 0;
  return [self.calendar isDateInWeekend:date] ? 1 : 2;
}

- (MGCDateRange*)dayPlannerView:(MGCDayPlannerView *)view dimmedTimeRangeAtIndex:(NSUInteger)index date:(NSDate *)date
{
  NSDate *start, *end;
  
  if ([self.calendar isDateInWeekend:date] || index == 0) {
    start = [self.calendar dateBySettingHour:0 minute:0 second:0 ofDate:date options:0];
  }
  else {
    start = [self.calendar dateBySettingHour:19 minute:0 second:0 ofDate:date options:0];
  }
  
  if ([self.calendar isDateInWeekend:date] || index == 1) {
    end = [self.calendar dateBySettingHour:23 minute:59 second:0 ofDate:date options:0];
  }
  else {
    end = [self.calendar dateBySettingHour:8 minute:59 second:0 ofDate:date options:0];
  }
  return [MGCDateRange dateRangeWithStart:start end:end];
}


#pragma mark - CalendarControllerNavigation

- (void)moveToDate:(NSDate*)date animated:(BOOL)animated
{
  if (!self.dayPlannerView.dateRange || [self.dayPlannerView.dateRange containsDate:date]) {
    [self.dayPlannerView scrollToDate:date options:MGCDayPlannerScrollDateTime animated:animated];
  }
}

- (void)moveToNextPageAnimated:(BOOL)animated
{
  NSDate *date;
  [self.dayPlannerView pageForwardAnimated:animated date:&date];
  //NSLog(@"paging forward to %@", date);
}

- (void)moveToPreviousPageAnimated:(BOOL)animated
{
  NSDate *date;
  [self.dayPlannerView pageBackwardsAnimated:animated date:&date];
  //NSLog(@"paging backwards to %@", date);
}

- (NSDate*)centerDate
{
  NSDate *date = [self.dayPlannerView dateAtPoint:self.dayPlannerView.center rounded:NO];
  return date;
}

@end
