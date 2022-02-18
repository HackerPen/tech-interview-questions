# Design a parking lot

## Constraints and assumptions

**What types of vehicles should we support?**
Motorcycle, Car, Bus

**Does each vehicle type take up a different amount of parking spots?**
Yes
```
Motorcycle spot -> Motorcycle
Compact spot -> Motorcycle, Car
Large spot -> Motorcycle, Car
Bus can park if we have 5 consecutive "large" spots
```

**Does the parking lot have multiple levels?**
Yes
