import StyledDataGrid from '@components/StyledDataGrid';
import { Add } from '@mui/icons-material';
import { Button, Grid2, Paper } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import InputSearch from '../common/InputSearch';

const SurveyList = () => {
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName:'Mã phiếu khảo sát',
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "name",
      headerName: 'Tên phiếu khảo sát',
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "company.name",
      headerName: 'Mã phiếu khảo sát',
      width: 200,
      editable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => <>{params.row.company?.name}</>,
    },

  ];
  return (
    <>
      <Grid2 container direction={'column'} spacing={2}>
        <Grid2 container justifyContent={'space-between'}>

        <InputSearch onSearch={() => {}} />
        <Button variant='contained' color='success'><Add/></Button>
        </Grid2>
        <Grid2>
          
        <Paper sx={{p:2}}>

        <StyledDataGrid
          columns={columns}
        />
        </Paper>
        </Grid2>
      </Grid2>
    </>
  )
}

export default SurveyList