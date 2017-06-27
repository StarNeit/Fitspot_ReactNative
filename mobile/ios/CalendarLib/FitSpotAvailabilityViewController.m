//
//  FitSpotAvailabilityViewController.m
//  App
//
//  Created by James Hall on 1/26/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "FitSpotAvailabilityViewController.h"

@interface FitSpotAvailabilityViewController ()

@end

@implementation FitSpotAvailabilityViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

-(void)viewDidAppear:(BOOL)animated{
  
  for (UIView *searchTableView in self.childViewControllers) {
    
    if ([searchTableView isKindOfClass:[UIScrollView class]]) {
      @try {
        // change stuff to eventTableView
        
        for (UIView *eventTableViewCell in [searchTableView subviews]) {
          
          if ([eventTableViewCell isKindOfClass:[UITableViewCell class]]) {
            @try {
              [(UITableViewCell *)eventTableViewCell setBackgroundColor:[UIColor clearColor]];
            }
            @catch (NSException * e) {
            }
          }
        }
        
        
      }
      @catch (NSException * e) {
      }
    }
  }

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

@end
