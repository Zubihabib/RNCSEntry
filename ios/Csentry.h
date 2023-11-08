
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCsentrySpec.h"

@interface Csentry : NSObject <NativeCsentrySpec>
#else
#import <React/RCTBridgeModule.h>

@interface Csentry : NSObject <RCTBridgeModule>
#endif

@end
