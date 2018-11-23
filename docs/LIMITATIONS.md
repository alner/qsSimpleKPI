# Limitations
## Infographic mode
Infographic mode will max out at 10 icons, an expression will need to be set accordingly for infographic visualization to be useful.

## Theme colors
There is a known limitation with automatic color changes when changing app theme.

**Expected**: The expected behaviour is for the colors in the extension to automatically be updated to the default colors of a theme when changing between themes.

**Actual**: The colors will change in the property panel, but the changes are not reflected in the extension object.


### Example

**With classic theme**
![Example](../resources/before_changing_theme.png)

**After changing to breeze theme**
![Example](../resources/after_changing_theme.png)
