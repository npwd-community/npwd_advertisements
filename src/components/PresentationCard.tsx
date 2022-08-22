import React, { MouseEvent, useState } from 'react';
import { Advertisement } from '../../shared/types';

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
import { reportReasons } from '../utils/constants';
import styled from '@emotion/styled';

const StyledCardContent = styled(CardContent)`
  word-break: break-all;
`;

const StyledDialogContent = styled(DialogContent)`
  word-break: break-all;
`;

interface PresentationCardProps {
  advertisement: Advertisement;
  onClose?(): void;
}

const PresentationCard = ({ advertisement, onClose }: PresentationCardProps) => {
  const isCreator = true;
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

  return (
    <div>
      <Card elevation={4}>
        <CardHeader
          title={advertisement.title || 'Missing title'}
          subheader={advertisement.creator.name}
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
        sx={{ position: 'absolute' }}
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack>
              <Typography variant="h5">{advertisement?.title || 'Missing title'}</Typography>
              <Typography variant="caption">{advertisement?.creator.name}</Typography>
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
                {advertisement?.phoneNumber && (
                  <>
                    {advertisement.isCallable && (
                      <>
                        <IconButton>
                          <ChatRounded />
                        </IconButton>
                        <IconButton>
                          <PhoneRounded />
                        </IconButton>
                      </>
                    )}

                    {advertisement.isPosition && (
                      <IconButton>
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
          {advertisement.isCallable && (
            <>
              <MenuItem>
                <ListItemIcon>
                  <CallRounded />
                </ListItemIcon>
                <ListItemText>Call</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <ChatRounded />
                </ListItemIcon>
                <ListItemText>Chat</ListItemText>
              </MenuItem>
            </>
          )}

          {advertisement.isPosition && (
            <MenuItem>
              <ListItemIcon>
                <RoomRounded />
              </ListItemIcon>
              <ListItemText>Show on map</ListItemText>
            </MenuItem>
          )}

          <Divider light />

          <MenuItem onClick={handleOpenReportMenu}>
            <ListItemIcon>
              <ReportRounded />
            </ListItemIcon>
            <ListItemText>Report</ListItemText>
          </MenuItem>

          {isCreator && (
            <>
              <Divider light />
              <MenuItem>
                <ListItemIcon>
                  <EditRounded />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem>
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
            <MenuItem>
              <ListItemText>{reason}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default PresentationCard;
