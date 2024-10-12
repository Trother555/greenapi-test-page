import { log } from "console";
import { randomBytes, randomUUID } from "crypto";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const InputComponent = ({name, setter} : {name: string, setter: any}) => {
    return (
        <TextField
            size="small"
            placeholder={name}
            onChange={ev => setter(ev.target.value)}
        />
    )
}

export function AppForm({responseSetter}: {responseSetter: any}) {
    const [apiUrl, setApiUrl] = useState('');
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    const [chatId, setChatId] = useState('');
    const [message, setMessage] = useState('');

    const [urlFile, setUrlFile] = useState('');

    async function getSettings(e: React.ChangeEvent<any>) {
        e.preventDefault();
        console.log(apiUrl, idInstance, apiTokenInstance);
        let res = await fetch(apiUrl + "/waInstance" + idInstance + "/getSettings/" + apiTokenInstance);
        let content = await res.json();
        console.log(content);
        responseSetter(JSON.stringify(content))
    }

    async function getStateInstance(e: React.ChangeEvent<any>) {
        e.preventDefault();
        console.log(apiUrl, idInstance, apiTokenInstance);
        let res = await fetch(apiUrl + "/waInstance" + idInstance + "/getStateInstance/" + apiTokenInstance);
        let content = await res.json();
        console.log(content);
        responseSetter(JSON.stringify(content))
    }

    async function sendMessage(e: React.ChangeEvent<any>) {
        e.preventDefault();
        console.log(apiUrl, idInstance, apiTokenInstance);
        let res = await fetch(
            apiUrl + "/waInstance" + idInstance + "/sendMessage/" + apiTokenInstance,
            {
                method: "POST",
                body: JSON.stringify({chatId: chatId, message: message}), 
            }
        );
        console.log(res.statusText);
        let content = await res.text();
        console.log(content);
        responseSetter(JSON.stringify(content))
    }

    async function sendFileByUrl(e: React.ChangeEvent<any>) {
        e.preventDefault();
        console.log(apiUrl, idInstance, apiTokenInstance);
        let urlPathArray = urlFile.split("/");
        let fileName = urlPathArray[urlPathArray.length - 1];
        let res = await fetch(
            apiUrl + "/waInstance" + idInstance + "/sendFileByUrl/" + apiTokenInstance,
            {
                method: "POST",
                body: JSON.stringify({chatId: chatId, urlFile: urlFile, fileName: fileName}),
            }
        );
        console.log(res.statusText);
        let content = await res.text();
        console.log(content);
        responseSetter(JSON.stringify(content))
    }


    return (
        <form className="register" method="post">
            <Stack spacing={6}>
                <Stack spacing={1}>
                    <InputComponent name="apiUrl" setter={setApiUrl}/>
                    <InputComponent name="idInstance" setter={setIdInstance}/>
                    <InputComponent name="apiTokenInstance" setter={setApiTokenInstance}/>
                </Stack>
                    
                <Stack spacing={1}>
                    <Button size="small" variant="contained" onClick={getSettings}>getSettings</Button>
                    <Button size="small" variant="contained" onClick={getStateInstance}>getStateInstance</Button>
                </Stack>

                <Stack spacing={1}>
                    <InputComponent name="chatId" setter={setChatId}/>
                    <InputComponent name="message" setter={setMessage}/>
                    <Button size="small" variant="contained" onClick={sendMessage}>sendMessage</Button>
                </Stack>

                <Stack spacing={1}>
                    <InputComponent name="chatId" setter={setChatId}/>
                    <InputComponent name="fileUrl" setter={setUrlFile}/>
                    <Button size="small" variant="contained" onClick={sendFileByUrl}>sendFileByUrl</Button>
                </Stack>
            </Stack>
        </form>
    );
}

export function Response({response} : {response: string}) {
    return <>
    <Stack width={1/4}>
        <label>Ответ:</label>
        <TextField value={response} slotProps={{input: { readOnly: true}}} multiline fullWidth/>
    </Stack>
    </>
}