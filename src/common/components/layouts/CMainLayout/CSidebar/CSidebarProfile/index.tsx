import { Avatar, Stack, Typography } from "@mui/material";

import avatarSrc from "@/assets/images/avatar.jpg";
import { CButton } from "@/components/controls";

import "./styles.scss";

const MOCKUP_PROFILE = {
  fullname: "Đặng Hoàng Phúc",
  email: "phucdh410@gmail.com",
};

export const CSidebarProfile = () => {
  return (
    <Stack
      className="c-sidebar-profile"
      alignItems="center"
      justifyContent="center"
      px={2}
      py={5}
      gap={1.5}
    >
      <Avatar className="c-sidebar--avatar">
        <img src={avatarSrc} alt="avatar-sidebar" />
      </Avatar>
      <Typography className="c-sidebar--fullname">
        {MOCKUP_PROFILE.fullname}
      </Typography>
      <Typography className="c-sidebar--email">
        {MOCKUP_PROFILE.email}
      </Typography>
      <CButton className="c-sidebar--button">Logout User</CButton>
    </Stack>
  );
};
