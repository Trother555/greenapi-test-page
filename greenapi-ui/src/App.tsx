import React from 'react';
import { useState } from "react";
import { AppForm, Response } from './getSettings';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack  from '@mui/material/Stack';

function App() {
    const [response, responseSetter] = useState('');
    return (
        <>
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="center">
                <AppForm responseSetter={responseSetter} />
                <Response response={response}/>
            </Stack>
        </>
    );
}

export default App;
