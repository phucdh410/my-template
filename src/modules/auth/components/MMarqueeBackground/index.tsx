import { Box, Stack } from "@mui/material";

import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";

const LIST_1 = [img3, img1, img5, img2, img6, img4];
const LIST_2 = [img6, img4, img2, img5, img1, img3];
const LIST_3 = [img2, img6, img3, img1, img4, img5];

import classNames from "classnames";

import "./styles.scss";

export const MMarqueeBackground = () => {
  return (
    <Stack
      position="relative"
      height="80vh"
      width="max-content"
      overflow="hidden"
      sx={{ perspective: "300px" }}
    >
      <Stack
        p={4}
        direction="row"
        spacing={4}
        sx={{
          transform:
            "translateX(-227px) translateY(-175px) translateZ(-42px) rotateX(6deg) rotateY(-12deg) rotateZ(12deg)",
        }}
      >
        {[LIST_1, LIST_2, LIST_3].map((list, listIndex) => (
          <Stack
            key={listIndex}
            direction="column"
            overflow="hidden"
            className="marquee"
          >
            {Array(2)
              .fill("")
              .map((e, i) => (
                <Stack
                  key={i}
                  direction="column"
                  className={classNames(
                    "marquee--content",
                    listIndex % 2 === 0 && "reverse"
                  )}
                >
                  {list.map((img, index) => (
                    <Stack
                      key={index}
                      className={classNames("marquee--item")}
                      flexShrink={0}
                      height={160}
                      width={250}
                      overflow="hidden"
                      borderRadius="8px"
                      border="2px solid #c0c0c0"
                    >
                      <img
                        src={img}
                        alt="img"
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </Stack>
                  ))}
                </Stack>
              ))}
          </Stack>
        ))}
      </Stack>
      <Box
        position="absolute"
        height="16%"
        left={0}
        right={0}
        top={0}
        sx={{
          backgroundImage:
            "linear-gradient(to bottom,rgb(244 249 255), rgba(244, 249, 255, 0))",
        }}
      ></Box>
      <Box
        position="absolute"
        height="16%"
        left={0}
        right={0}
        bottom={0}
        sx={{
          backgroundImage:
            "linear-gradient(to top, rgb(244 249 255), rgba(244, 249, 255, 0))",
        }}
      ></Box>
      <Box
        position="absolute"
        width="16%"
        left={0}
        bottom={0}
        top={0}
        sx={{
          backgroundImage:
            "linear-gradient(to right, rgb(244 249 255), rgba(244, 249, 255, 0))",
        }}
      ></Box>
      <Box
        position="absolute"
        width="16%"
        bottom={0}
        right={0}
        top={0}
        sx={{
          backgroundImage:
            "linear-gradient(to left, rgb(244 249 255), rgba(244, 249, 255, 0))",
        }}
      ></Box>
    </Stack>
  );
};
