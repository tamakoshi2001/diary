import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { Alert, Snackbar } from './mui';

type Props = {
    message: string,
    isOpened: boolean,
    setIsOpened: Dispatch<SetStateAction<boolean>>
}

export default function SuccessMessageToast({ message, isOpened, setIsOpened }: Props) {
    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpened(false);
    }

    return (
      <Snackbar open={isOpened} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    )
}