import { CalendarMonthOutlined, ExpandMore } from "@mui/icons-material";
import { Components, createTheme, Theme } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";

import {
  INPUT_BORDER_RADIUS,
  INPUT_LEGEND_FONT_SIZE,
  INPUT_LINE_HEIGHT,
  INPUT_PADDING,
  INPUT_TRANSFORM_INITIAL,
  INPUT_TRANSFORM_SHRINK,
  TABLE_CELL_PADDING,
} from "./common";

//#region Breakpoints & Palette & Typography
let theme = createTheme({
  palette: {
    primary: {
      main: "#8C56DEFF",
    },
    secondary: {
      main: "#DCD6F7",
    },
    text: {
      primary: "#424874",
      secondary: "#424874",
      disabled: "#c5c5c5",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    action: {
      focus: "#522111",
      active: "#424874",
      hover: "rgb(248 248 248)",
      selected: "#ee3311",
    },
    error: {
      main: "#ec1010",
    },
    background: {
      default: "#FFFFFFFF",
      paper: "#FFFFFFFF",
    },
    border: {
      main: "#dde7ee",
    },
    black: {
      main: "#32383e",
    },
    white: {
      main: "#ffffff",
    },
    custom: {
      main: "#333333",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
  typography: {
    fontFamily: `"Plus Jakarta Sans", serif`,
    fontSize: 14,
    htmlFontSize: 16,
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1536,
      "2xl": 1680,
      "3xl": 1920,
    },
  },
});
//#endregion

//#region Components
theme = createTheme(theme, {
  cssVariables: true,
  components: {
    //#region FormHelperText
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          paddingInline: "6px",
        },
      },
    },
    //#endregion
    //#region Button
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.c-table-filter--button": {
            padding: "5px 15px",
            borderRadius: "8px",
            color: theme.palette.black.main,
            borderWidth: "1px",
            borderColor: theme.palette.border.main,
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 1px 2px 0px",
          },
          "&.c-button": {
            "&.MuiButton-contained": {
              boxShadow: `rgba(0, 0, 0, 0.08) 0px 1px 2px 0px, ${theme.palette.primary.main} 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.16) 0px 2px 0px 0px inset`,
            },
          },
        },
      },
    },
    //#endregion
    //#region TextField
    MuiTextField: {
      defaultProps: {
        autoCapitalize: "off",
        autoComplete: "off",
        autoCorrect: "off",
      },
      styleOverrides: {
        root: {
          "&.c-input,&.c-date-picker": {
            ".MuiInputLabel-root": {
              transform: INPUT_TRANSFORM_INITIAL,
              "&.MuiInputLabel-shrink": {
                transform: INPUT_TRANSFORM_SHRINK,
              },
            },
            ".MuiOutlinedInput-root": {
              borderRadius: INPUT_BORDER_RADIUS,
              ".MuiOutlinedInput-input": {
                height: "unset",
                padding: INPUT_PADDING,
                lineHeight: INPUT_LINE_HEIGHT,
              },
              "&.MuiInputBase-multiline": {
                padding: INPUT_PADDING,
                ".MuiOutlinedInput-input": {
                  padding: 0,
                },
              },
              legend: {
                fontSize: INPUT_LEGEND_FONT_SIZE,
              },
            },
          },
        },
      },
    },
    //#endregion
    //#region Autocomplete
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: <ExpandMore />,
      },
      styleOverrides: {
        root: {
          "&.c-autocomplete": {
            ".MuiInputLabel-root": {
              transform: INPUT_TRANSFORM_INITIAL,
              "&.MuiInputLabel-shrink": {
                transform: INPUT_TRANSFORM_SHRINK,
              },
            },
            ".MuiAutocomplete-inputRoot": {
              padding: 0,
              paddingRight: "39px",
              borderRadius: INPUT_BORDER_RADIUS,
              ".MuiAutocomplete-input": {
                height: "unset",
                padding: INPUT_PADDING,
                lineHeight: INPUT_LINE_HEIGHT,
              },
              legend: {
                fontSize: INPUT_LEGEND_FONT_SIZE,
              },
            },
          },
        },
        popper: {
          "&.MuiAutocomplete-popper": {
            ".MuiPaper-root.MuiAutocomplete-paper": {
              boxShadow: "0 6px 30px rgba(0, 0, 0, 0.08)",
              border: `1px solid ${theme.palette.secondary.main}`,
              marginTop: "4px",
              borderRadius: "8px",
              ".MuiAutocomplete-listbox": {
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                color: theme.palette.text.primary,
                maxHeight: "35vh",
                ".MuiAutocomplete-option": {
                  color: "inherit",
                  minHeight: "36px",
                  padding: "6px 10px",
                  borderRadius: "8px",
                },
              },
            },
          },
        },
      },
    },
    //#endregion
    //#region Popper
    MuiPopper: {
      styleOverrides: {
        root: {},
      },
    },
    //#endregion
    //#region Popover
    MuiPopover: {
      styleOverrides: {
        root: {
          "&.c-filter-table--popover": {
            ".MuiPaper-root": {
              width: 320,
              marginTop: "4px",
              borderRadius: "12px",
              border: "1px solid black",
              borderColor: theme.palette.divider,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            },
          },
        },
      },
    },
    //#endregion
    //#region DatePicker
    MuiDatePicker: {
      defaultProps: {
        slots: {
          openPickerIcon: CalendarMonthOutlined,
          switchViewIcon: ExpandMore,
        },
      },
    },
    //#endregion
    //#region DayCalendar
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          fontWeight: 600,
          letterSpacing: "0.05em",
          fontSize: "0.875rem",
          userSelect: "none",
          color: theme.palette.divider,
        },
      },
    },
    //#endregion
    //#region PickersCalendarHeader
    MuiPickersCalendarHeader: {
      styleOverrides: {
        label: {
          textTransform: "capitalize",
        },
      },
    },
    //#endregion
    //#region PickersDay
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 600,
          "&.Mui-selected,&:focus.Mui-selected": {
            backgroundColor: "transparent",
            color: theme.palette.primary.main,
            border: `2px solid ${theme.palette.primary.main}`,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
          "&.MuiPickersDay-dayOutsideMonth": {
            color: theme.palette.text.disabled,
          },
        },
        today: {
          "&:focus": {
            backgroundColor: "transparent",
          },
          color: theme.palette.error.main,
          border: "none",
          "&.MuiPickersDay-root:not(.Mui-selected)": {
            border: "none",
            "&:after": {
              content: "''",
              position: "absolute",
              borderRadius: "100%",
              height: "6px",
              width: "6px",
              bottom: "4px",
              backgroundColor: theme.palette.error.main,
            },
          },
        },
      },
    },
    //#endregion
    //#region PickersPopper
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          borderRadius: "18px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        },
      },
    },
    //#endregion
    //#region Dialog
    MuiDialog: {
      styleOverrides: {
        root: {},
      },
    },
    //#endregion
    //#region Table
    MuiTable: {
      defaultProps: {
        stickyHeader: true,
      },
      styleOverrides: {
        root: {
          "&.c-table": {
            ".c-table-head--row,.c-table-body--row": {
              ".c-table-head--cell,.c-table-body--cell": {
                "&.pin-left.pin-left-last,&.pin-right.pin-right-first": {
                  "&:after": {
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "30px",
                    transition: "box-shadow 0.3s",
                    content: "''",
                    pointerEvents: "none",
                  },
                },
                "&.pin-left.pin-left-last": {
                  "&:after": {
                    right: 0,
                    transform: "translateX(100%)",
                  },
                },
                "&.pin-right.pin-right-first": {
                  "&:after": {
                    left: 0,
                    transform: "translateX(-100%)",
                  },
                },
              },
            },
            "&.left-pin-shadow": {
              ".c-table-head--row,.c-table-body--row": {
                ".c-table-head--cell,.c-table-body--cell": {
                  "&.pin-left-last::after": {
                    boxShadow: "inset 10px 0 8px -8px rgba(5, 5, 5, 0.06)",
                  },
                },
              },
            },
            "&.right-pin-shadow": {
              ".c-table-head--row,.c-table-body--row": {
                ".c-table-head--cell,.c-table-body--cell": {
                  "&.pin-right-first::after": {
                    boxShadow: "inset -10px 0 8px -8px rgba(5, 5, 5, 0.06)",
                  },
                },
              },
            },
          },
        },
      },
    },
    //#endregion
    //#region TableHead
    MuiTableHead: {
      defaultProps: {},
      styleOverrides: {
        root: {
          "&.c-table-head": {
            ".c-table-head--row": {
              ".c-table-head--cell": {
                whiteSpace: "nowrap",
                padding: TABLE_CELL_PADDING,
                backgroundColor: "#f9fafb",
                color: "#868D9CFF",
              },
            },
          },
        },
      },
    },
    //#endregion
    //#region TableBody
    MuiTableBody: {
      styleOverrides: {
        root: {
          "&.c-table-body": {
            ".c-table-body--row": {
              ".c-table-body--cell": {
                padding: TABLE_CELL_PADDING,
                backgroundColor: theme.palette.white.main,
              },
            },
          },
        },
      },
    },
    //#endregion
  } as Components<Omit<Theme, "components">>,
});
//#endregion

export { theme };

//#region Declare
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    "2xl": true;
    "3xl": true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    black: Palette["primary"];
    white: Palette["primary"];
    border: Palette["primary"];
    custom: Palette["primary"];
  }

  interface PaletteOptions {
    black?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
    border?: PaletteOptions["primary"];
    custom?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    black: true;
    white: true;
    border: true;
    custom: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    black: true;
    white: true;
    border: true;
    custom: true;
  }
}
//#endregion
