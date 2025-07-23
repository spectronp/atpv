import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Finalizacao = ({ atpvData }) => {
    
    const nomesCampos = {
       tipoRegistro: "Tipo de Registro",
    }

    const buildTable = () => {
        let rowArray = [];

        for(const [key, value] of Object.entries(atpvData.current)){
            if(key == "comprador" || key == "vendedor") continue
            rowArray.push(<TableRow key={key}>
                <TableCell >{key}</TableCell>
                <TableCell >{value}</TableCell>
            </TableRow>)            
        }
    
        return rowArray;
    }

    return <Table size="small" sx={{ width: "50%" }}>
        <TableHead>
            <TableRow>
                <TableCell>Campo</TableCell>
                <TableCell>Valor</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {buildTable()}
        </TableBody>
    </Table>
}

export default Finalizacao;
