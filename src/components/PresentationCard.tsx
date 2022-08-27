import React, { MouseEvent, useState } from 'react';
import {
  Advertisement,
  AdvertisementActionInput,
  ReportAdvertisementInput,
  SetWaypointInput,
} from '../../shared/types';

import {
  CallRounded,
  ChatRounded,
  Close,
  DeleteRounded,
  EditRounded,
  MoreVert,
  PhoneRounded,
  ReportRounded,
  RoomRounded,
} from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from '@emotion/styled';
import fetchNui from '../utils/fetchNui';
import { AdvertisementsEvents, ReportReason, reportReasons } from '../../shared/events';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { advertisementsAtom } from '../atoms/advertisements';
import { userAtom } from '../atoms/user';

const StyledCardContent = styled(CardContent)`
  word-break: break-all;
`;

const StyledDialogContent = styled(DialogContent)`
  word-break: break-all;
`;

interface PresentationCardProps {
  advertisement: Advertisement;
  isPreview?: boolean;
  onClose?(): void;
}

const PresentationCard = ({ advertisement, onClose, isPreview }: PresentationCardProps) => {
  const user = useRecoilValue(userAtom);
  const setAdvertisements = useSetRecoilState(advertisementsAtom);
  const isCreator = advertisement.creator.citizenId === user?.citizenId;

  const advertisementId = advertisement.id;
  const hideCreatorActions = isCreator && !isPreview;
  console.log({ isCreator, advertisement, user });

  const [isContentOpen, setIsContentOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<Element>();
  const [reportMenuAnchor, setReportMenuAnchor] = useState<Element>();

  const handleOpenMenu = (event: MouseEvent) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleOpenReportMenu = (event: MouseEvent) => {
    setReportMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(undefined);
  };

  const handleCloseReportMenu = () => {
    setMenuAnchor(undefined);
    setReportMenuAnchor(undefined);
  };

  const handleClose = () => {
    onClose?.();
    setIsContentOpen(false);
  };

  const handleDeleteAdvertisement = async () => {
    if (isPreview) return;
    try {
      await fetchNui<boolean, AdvertisementActionInput>(AdvertisementsEvents.DeleteAdvertisement, {
        advertisementId,
      });
      setAdvertisements((prev) => prev.filter((adv) => adv.id !== advertisement.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReport = async (reason: ReportReason) => {
    if (isPreview) return;
    try {
      await fetchNui<boolean, ReportAdvertisementInput>(AdvertisementsEvents.ReportAdvertisement, {
        advertisementId,
        reason,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCall = async () => {
    if (isPreview) return;
    try {
      await fetchNui<boolean, SetWaypointInput>(AdvertisementsEvents.SetWaypointAdvertisement, {
        waypoint: advertisement.waypoint,
      });
      setAdvertisements((prev) => prev.filter((adv) => adv.id !== advertisement.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChat = async () => {
    if (isPreview) return;
    try {
      await fetchNui<boolean, SetWaypointInput>(AdvertisementsEvents.SetWaypointAdvertisement, {
        waypoint: advertisement.waypoint,
      });
      setAdvertisements((prev) => prev.filter((adv) => adv.id !== advertisement.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetWaypoint = async () => {
    if (isPreview) return;
    try {
      await fetchNui<boolean, SetWaypointInput>(AdvertisementsEvents.SetWaypointAdvertisement, {
        waypoint: advertisement.waypoint,
      });
      setAdvertisements((prev) => prev.filter((adv) => adv.id !== advertisement.id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card elevation={4}>
        <CardHeader
          title={advertisement.title || 'Missing title'}
          subheader={advertisement?.creator?.name || 'Unknown'}
          action={
            <IconButton onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          }
        />

        <CardActionArea onClick={() => setIsContentOpen(true)}>
          <>
            {advertisement.image && (
              <CardMedia height={240} component="img" image={advertisement.image} />
            )}

            <Divider light />

            <StyledCardContent>
              <ReactMarkdown
                children={advertisement.description || 'Missing description'}
                remarkPlugins={[remarkGfm]}
                disallowedElements={['a']}
              />
            </StyledCardContent>
          </>
        </CardActionArea>
      </Card>

      <Dialog
        open={isContentOpen}
        onClose={handleClose}
        disablePortal
        hideBackdrop
        fullScreen
        PaperProps={{ elevation: 0, square: true }}
        sx={{ position: 'absolute' }}
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack>
              <Typography variant="h5">{advertisement?.title || 'Missing title'}</Typography>
              <Typography variant="caption">{advertisement?.creator?.name || 'Unknown'}</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVert />
              </IconButton>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>

        <Divider />

        <StyledDialogContent>
          <ReactMarkdown
            children={advertisement?.body || 'Missing content'}
            remarkPlugins={[remarkGfm]}
            disallowedElements={['a']}
          />
        </StyledDialogContent>

        <Divider />

        {(advertisement.isCallable || advertisement.isPosition) && (
          <DialogActions>
            <Box p={1} pr={2.5}>
              <Stack direction="row" spacing={1}>
                {!hideCreatorActions && advertisement?.phoneNumber && (
                  <>
                    {advertisement.isCallable && (
                      <>
                        <IconButton onClick={handleChat}>
                          <ChatRounded />
                        </IconButton>
                        <IconButton onClick={handleCall}>
                          <PhoneRounded />
                        </IconButton>
                      </>
                    )}

                    {advertisement.waypoint && advertisement.isPosition && (
                      <IconButton onClick={handleSetWaypoint}>
                        <RoomRounded />
                      </IconButton>
                    )}
                  </>
                )}
              </Stack>
            </Box>
          </DialogActions>
        )}
      </Dialog>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
        transformOrigin={{ horizontal: 'right', vertical: 'center' }}
      >
        <MenuList disablePadding sx={{ minWidth: 150 }}>
          {!hideCreatorActions && advertisement.isCallable && (
            <>
              <MenuItem onClick={handleCall}>
                <ListItemIcon>
                  <CallRounded />
                </ListItemIcon>
                <ListItemText>Call</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleChat}>
                <ListItemIcon>
                  <ChatRounded />
                </ListItemIcon>
                <ListItemText>Chat</ListItemText>
              </MenuItem>
            </>
          )}

          {advertisement.waypoint && advertisement.isPosition && (
            <MenuItem onClick={handleSetWaypoint}>
              <ListItemIcon>
                <RoomRounded />
              </ListItemIcon>
              <ListItemText>Show on map</ListItemText>
            </MenuItem>
          )}

          {/* {!hideCreatorActions && ( */}
          <>
            <Divider light />
            <MenuItem onClick={handleOpenReportMenu}>
              <ListItemIcon>
                <ReportRounded />
              </ListItemIcon>
              <ListItemText>Report</ListItemText>
            </MenuItem>
          </>
          {/* )} */}

          {isCreator && (
            <>
              <Divider light />
              <MenuItem>
                <ListItemIcon>
                  <EditRounded />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteAdvertisement}>
                <ListItemIcon>
                  <DeleteRounded />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>

      <Menu
        anchorEl={reportMenuAnchor}
        open={Boolean(reportMenuAnchor)}
        onClose={handleCloseReportMenu}
        anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
        transformOrigin={{ horizontal: 'center', vertical: 'center' }}
      >
        <MenuList disablePadding sx={{ minWidth: 150 }}>
          {reportReasons.map((reason) => (
            <MenuItem onClick={() => handleReport(reason)}>
              <ListItemText>{reason}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default PresentationCard;
