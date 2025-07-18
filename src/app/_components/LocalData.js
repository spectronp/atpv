import { InputLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const LocalData = () => {
    return <>
        <InputLabel>Data da Venda</InputLabel>
       <DatePicker />  
       <TextField label="Valor do Veiculo" />
    </>
}

export default LocalData;
