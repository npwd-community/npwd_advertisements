import { Stack } from '@mui/material';
import { SearchField } from 'layout/ui';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { advertisementsAtom } from '../atoms/advertisements';
import { userAtom } from '../atoms/user';
import PresentationCard from '../components/PresentationCard';

const Advertisements = () => {
  const advertisements = useRecoilValue(advertisementsAtom);
  const [search, setSearch] = useState('');

  const filteredAdvertisement = advertisements.filter((advertisement) =>
    advertisement.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Stack spacing={1.5}>
        <SearchField
          placeholder="Search .."
          value={search}
          onChange={(event: any) => setSearch(event.target.value)}
        />

        {filteredAdvertisement.map((advertisement) => (
          <PresentationCard advertisement={advertisement} key={advertisement.id} />
        ))}
      </Stack>
    </div>
  );
};

export default Advertisements;
