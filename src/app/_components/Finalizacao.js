import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";

const Finalizacao = ({ atpvData }) => {
    
    const nomesCampos = {
       tipoRegistro: "Tipo de Registro",
       dataVenda: "Data da Venda",
       valorVeiculo: "Valor do Veiculo",
       cidade: "Cidade",
       uf: "UF",
       placa: "Placa",
       renavam: "Renavam",
       chassi: "Chassi",
       crv: "CRV",
       dataEmissaoCrv: "Data de Emissao do CRV",
       numeroViaCrv: "Numero da Via do CRV",
       codigoSegurancaCrv: "Codigo de Seguranca do CRV",
       anoFabricacao: "Ano de Fabricacao",
       anoModelo: "Ano do Modelo",
       quilometragem: "Quilometragem",
       tipo: "Tipo de Pessoa",
       nome: "Nome",
       cpfCnpj: "CPF/CNPJ",
       email: "Email",
       cep: "CEP",
       endereco: "endereco",
       numero: "Numero",
    }

    let geralArray = [];
    let vendedorArray = [];
    let compradorArray = [];

    for(const [key, value] of Object.entries(atpvData.current)){
        if(key == "comprador" || key == "vendedor") continue
        geralArray.push(<TableRow key={key}>
            <TableCell >{nomesCampos[key]}</TableCell>
            <TableCell >{dayjs.isDayjs(value) ? value.format("DD/MM/YYYY") : value}</TableCell>
        </TableRow>)            
    }
    for(const [key, value] of Object.entries(atpvData.current.vendedor)){
        vendedorArray.push(<TableRow key={key}>
            <TableCell >{nomesCampos[key]}</TableCell>
            <TableCell >{dayjs.isDayjs(value) ? value.format("DD/MM/YYYY") : value}</TableCell>
        </TableRow>)
    }
    for(const [key, value] of Object.entries(atpvData.current.comprador)){
        compradorArray.push(<TableRow key={key}>
            <TableCell >{nomesCampos[key]}</TableCell>
            <TableCell >{dayjs.isDayjs(value) ? value.format("DD/MM/YYYY") : value}</TableCell>
        </TableRow>)
    }
    console.log('render final')
    return <Stack direction="row" spacing={5} sx={{ width: "90%" }}>
    <Table size="small" sx={{ width: "40%" }}>
        <TableHead>
            <TableRow>
                <TableCell>Campo</TableCell>
                <TableCell>Valor</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {geralArray}
        </TableBody>
    </Table>
    <Table size="small" sx={{ width: "40%" }}>
        <TableHead>
            <TableRow>
                <TableCell colSpan={2} align="center">Vendedor</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Campo</TableCell>
                <TableCell>Valor</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {vendedorArray}
        </TableBody>
    </Table>
    <Table size="small" sx={{ width: "40%" }}>
        <TableHead>
            <TableRow>
                <TableCell colSpan={2} align="center">Comprador</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Campo</TableCell>
                <TableCell>Valor</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {compradorArray}
        </TableBody>
    </Table>
    </Stack>
}

export default Finalizacao;
