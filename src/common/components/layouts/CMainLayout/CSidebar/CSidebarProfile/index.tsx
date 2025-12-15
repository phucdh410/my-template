import { PowerSettingsNew } from "@mui/icons-material";
import { Avatar, ButtonBase, Stack, Typography } from "@mui/material";

import { CButton } from "@/components/controls";

import avatarSrc from "@/assets/images/avatar.jpg";

import "./styles.scss";

const MOCKUP_PROFILE = {
  fullname: "Đặng Hoàng Phúc",
  email: "phucdh410@gmail.com",
};

export const CSidebarProfile = ({ open }: { open?: boolean }) => {
  //#region Event
  const onLogout = () => {
    console.log("Chưa xử lí");
  };
  //#endregion

  //#region Render
  //#endregion
  return open ? (
    <Stack
      className="c-sidebar-profile"
      alignItems="center"
      justifyContent="center"
      px={2}
      pt={2.5}
      pb={3}
      gap={1.5}
      flexShrink={0}
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
      <CButton onClick={onLogout} className="c-sidebar--button">
        Logout User
      </CButton>
    </Stack>
  ) : (
    <Stack
      className="c-sidebar-profile-collapse"
      direction="row"
      alignItems="center"
      justifyContent="center"
      pt={1.5}
      pb={2.5}
    >
      <ButtonBase onClick={onLogout}>
        <Avatar variant="rounded">
          <PowerSettingsNew />
        </Avatar>
      </ButtonBase>
    </Stack>
  );
};
