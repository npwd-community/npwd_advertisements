import { Error, ErrorRounded, ImageRounded, RefreshRounded } from '@mui/icons-material';
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Fab,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AdvertisementsEvents } from '../../shared/events';
import { CreateAdvertisementInput } from '../../shared/types';
import PresentationCard from '../components/PresentationCard';
import fetchNui from '../utils/fetchNui';
import { MockedCreator } from '../utils/mocks';

const Create = () => {
  const phoneNumber = '072 02828';
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const { getValues, control, handleSubmit, formState } = useForm<CreateAdvertisementInput>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      image: '',
      isCallable: false,
      isPosition: false,
    },
  });

  const onSubmit = async (values: CreateAdvertisementInput) => {
    setIsLoading(true);

    try {
      await fetchNui<unknown, CreateAdvertisementInput>(
        AdvertisementsEvents.CreateAdvertisement,
        values,
      );
      setError('');
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  if (isPreview) {
    return (
      <>
        <PresentationCard
          advertisement={{
            ...getValues(),
            id: -1,
            creator: MockedCreator,
            phoneNumber,
          }}
        />

        <Box sx={{ position: 'absolute', bottom: '4.5rem', right: '1.5rem' }}>
          <Fab onClick={() => setIsPreview(false)} variant="extended">
            Close preview
          </Fab>
        </Box>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={0.5}>
        <Typography variant="h5">New advertisement</Typography>
        <Typography variant="caption">
          You can edit your advertisement from the advertisements view
        </Typography>
      </Stack>
      <Divider sx={{ margin: '1.5rem 0' }} />

      <Stack spacing={2}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: {
              message: 'Required field',
              value: true,
            },
            minLength: {
              message: 'Min length 3',
              value: 3,
            },
            maxLength: {
              message: 'Max length 20',
              value: 20,
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              placeholder="Title"
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message ?? ''}
              {...field}
            />
          )}
        />

        <TextField
          placeholder="Image"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <ImageRounded />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            required: {
              message: 'Required field',
              value: true,
            },
            minLength: {
              message: 'Min length 15',
              value: 15,
            },
            maxLength: {
              message: 'Max length 100',
              value: 100,
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              placeholder="Description"
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message ?? ''}
              rows={3}
              multiline
              {...field}
            />
          )}
        />

        <Controller
          name="body"
          control={control}
          rules={{
            required: {
              message: 'Required field',
              value: true,
            },
            minLength: {
              message: 'Min length 50',
              value: 50,
            },
            maxLength: {
              message: 'Max length 3000',
              value: 3000,
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              placeholder="Body"
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message ?? ''}
              rows={6}
              multiline
              {...field}
            />
          )}
        />

        <Stack spacing={0.5}>
          <FormGroup>
            <FormControlLabel
              label="Show phone number"
              control={
                <Controller
                  name="isCallable"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} />}
                />
              }
            />

            <FormControlLabel
              label="Display your location"
              control={
                <Controller
                  name="isPosition"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} />}
                />
              }
            />
          </FormGroup>
        </Stack>

        {error && (
          <Alert
            icon={isLoading ? <RefreshRounded /> : <ErrorRounded />}
            color={isLoading ? 'info' : 'error'}
            variant="outlined"
          >
            {isLoading ? 'Loading ..' : error}
          </Alert>
        )}

        <Button
          fullWidth
          variant="outlined"
          onClick={() => setIsPreview(true)}
          disabled={isLoading}
        >
          Preview
        </Button>

        <Button fullWidth variant="contained" type="submit" disabled={isLoading}>
          Publish
        </Button>
      </Stack>
    </form>
  );
};

export default Create;
