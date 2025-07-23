import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TipoDeRegistro = ({ updateAtpvData, handleNext }) => {
    const items = [
        {
            descricao: "ATPV-e SP",
            valor: 19.90,
            uf: "SP"
        },
        {
            descricao: "ATPV-e MG",
            valor: 19.90,
            uf: "MG"
        },
        {
            descricao: "ATPV-e PR",
            valor: 19.90,
            uf: "PR"
        },

    ];

    const handleSelect = (escolhido) => {
        updateAtpvData({ tipoRegistro: escolhido });
        handleNext();
    }

    return <Table >
        <TableHead >
            <TableRow >
                <TableCell >Descricao</TableCell>
                <TableCell >Valor</TableCell>
                <TableCell >UF</TableCell>
            </TableRow>
        </TableHead>
        <TableBody >
            {items.map(item => (
                <TableRow key={item.uf}>
                    <TableCell >{item.descricao}</TableCell>
                    <TableCell >{item.valor}</TableCell>
                    <TableCell >{item.uf}</TableCell>
                    <TableCell ><Button onClick={() => {handleSelect(item.descricao)}} ><ArrowForwardIcon /></Button></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}

export default TipoDeRegistro;
