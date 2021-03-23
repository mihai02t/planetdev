import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: '100%',
      square: true
    },
    container: {
      maxHeight: 460
    },
    header: {
        color: 'white',
        backgroundColor: 'black'
    },
    body: {
        backgroundColor: '#ececed',
        color: '#dddddd'
    }
});  

const columns = [
    {id: 'name', label: 'Username', minWidth: 120},
    {id: 'time', label: 'Joined Since', minWidth: 90},
    {id: 'chapters', label: 'Chapter Passed', minWidth: 150, align: 'right'},
];

function createData(name: string, time: string, chapters: string) {
    const data: {[key: string]: string} = { name, time, chapters };
    return data;
}

const rows = [
    createData('Name01', 'joined time01', 'passed chapter01'),
    createData('Name02', 'joined time02', 'passes chapter02'),
    createData('Name03', 'joined time03', 'passed chapter03'),
    createData('Name04', 'joined time04', 'passed chapter04'),
    createData('Name05', 'joined time05', 'passed chapter05'),
    createData('Name06', 'joined time06', 'passed chapter06'),
    createData('Name07', 'joined time07', 'passes chapter07'),
    createData('Name08', 'joined time08', 'passes chapter08'),
    createData('Name09', 'joined time09', 'passed chapter09'),
    createData('Name10', 'joined time10', 'passed chapter10'),
    createData('Name11', 'joined time11', 'passed chapter11'),
    createData('Name12', 'joined time12', 'passed chapter12'),
    createData('Name13', 'joined time13', 'passes chapter13'),
    createData('Name14', 'joined time14', 'passed chapter14'),
    createData('Name15', 'joined time15', 'passed chapter15'),
];

const DashboardPlayer = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      className={classes.header}
                      key={column.id}
                      align={column.align as TableCellProps["align"]}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={classes.body}>
                {rows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" key={row.name}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align as TableCellProps["align"]}>
                            {value}
                          </TableCell>);})}
                    </TableRow>
                    );})}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      );    
};

export default DashboardPlayer;