import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
//import TableHead from '@mui/material/TableHead';
//npm i material-react-table

const jPersons: any = (xsize: number) => {
    //var s = "0000" + num;
    // Generate random data
    var names = [ 'Grzegorz', 'Janusz', 'Mariusz','Marcin', 'Alberto', 'John', 'Dariusz','Kuba','Piotr','Krzysztof',
      'Andrzej','Tomasz','Paweł','Mieszko','Wojciech','Stanisław','Miłosz','Kazimierz','Abel','Iwo',
      'Jarema','Apolinary','Apoloniusz','Mirosław','Grzegorz','Czesław','Dariusz','Wojciech','Jacek','Eugeniusz',
      'Tomasz','Stefan','Zygmunt','Leszek','Bogdan','Antoni','Paweł','Franciszek','Sławomir','Waldemar',
      'Robert','Mariusz','Włodzimierz','Michał','Zenon','Bogusław','Witold','Aleksander','Bronisław','Wacław',
      'Bolesław'
    ];
    const surnames = ['Michalak','Faber','Sajnok','Brozyna','Contador','Biniek','Banot','Machura','Garnys','Raven',
      'Nowak','Kowalski','Wiśniewski','Wójcik','Kowalczyk','Kamiński','Lewandowski','Zieliński','Szymański','Woźniak',
      'Dąbrowski','Kozłowski','Mazur','Jankowski','Kwiatkowski','Wojciechowski','Krawczyk','Kaczmarek','Piotrowski','Grabowski',
      'Ryłko','Lech'
    ];
    var cities = [ 'Sopot','Lublin','Kraków','Katowice','Olsztyn','Radom','Gdynia','Garwolin','Białystok','Pisz',
                   'Warszawa','Koszalin','Szczecin','Poznań','Wrocław'
    ];
    var street = [ 'Mickiewicza', 'Dmowskiego', 'Lombard', 'Bema','Rozbrat','Piwna','Widok','Tagore','Zawrat','Wici',
      'Boryny','Słowackiego','Fabryczna','Karowa','Chmielna','Graniczna','Kolska','Krucza','Grenadierów','Tytusa',
      'Bugaj','Hipoteczna','Frascati','Jasna','Jakuba'
    ];
    const ul = ['ul','al','ul','ul','ul'];
    const tabAvatar = ['1052','106','1071','1091','1136','1196','195','318','347','394','432','703','749','87','925','943'];
    //'./jpg/106.jpg'
    var data = [];
    for (var i = 0; i < xsize; i++) {
        data.push({
            id: i,
            name: { 
              firstName: names[~~(Math.random() * names.length)],
              lastName: surnames[~~(Math.random() * surnames.length)]
            },
            address: ul[~~(Math.random() * ul.length)] +'. '+ street[~~(Math.random() * street.length)] +' '+ ~~(Math.random() * 120),
            city: cities[~~(Math.random() * cities.length)],
            state: ~~(Math.random() * 245000),
            avatar: './jpg/' + tabAvatar[~~(Math.random() * tabAvatar.length)] + '.jpg',
          });
    }

    return(data);
    //return s.substr(s.length-size);
}

const data: any = jPersons(500);

type Person = {
  id: number;
  name: {
    firstName: string,
    lastName: string,
  }
  address: string;
  city: string;
  salary: number;
  state: number;
  avatar: string;
};


const BasicTab = () => {
  
  //const btab = jpad(23,2);
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [

      {
        accessorKey: 'avatar', //access nested data with dot notation
        header: 'Av',
        size: 50,
        enableSorting: false, //users will not be able to remove a sort on a column
        //header: <i style={{ color: 'red', backgroundColor: '#EEE', padding:'3px'}}>Name</i>, //plain jsx with no function
        //Cell: <i style={{ color: 'red', backgroundColor: '#EEE'}}>Age</i>, //plain jsx with no function
        Cell: ({ renderedCellValue, row }) => 
        <img height={30} src={row.original.avatar} style={{ padding:0, borderRadius: '25%' }} />  //'./jpg/106.jpg' />
      },
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'Name',
        size: 100,
        //header: 'Name', //plain jsx with no function
        //Cell: <i style={{ color: 'red', backgroundColor: '#EEE'}}>Age</i>, //plain jsx with no function
        //Cell: ({ renderedCellValue }) => <span style={{ color: 'red', backgroundColor: '#EEE', padding:'1px 10px'}}>{renderedCellValue}</span>, // use renderedCellValue instead of cell.getValue()
      },
      {
        accessorKey: 'name.lastName',
        header: 'SurName',
        enableEditing: true,
        size: 110,
        minSize: 90, //min size enforced during resizing
        maxSize: 150, //max size enforced during resizing
        enableSorting: false, //disable sorting on this column
        visibleInShowHideMenu: true, //hide this column from the show hide menu, but still show the column in the table
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 150,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 90,
      },
      {
        accessorKey: 'state',
        header: 'Savings',
        size: 110,
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'right',
        }, 
        Cell: ({ renderedCellValue, row }) => 
          <span style={{  
            backgroundColor:
              row.original.state < 80_000
              ? '#be4175':
                  row.original.state > 179_000
                    ? '#72fbd4':
                    '#fefab5', // '#fde079',

              color:
                row.original.state < 80_000
                  ? '#FFF':
                  '#111', // '#fde079',
            padding:'0px 10px', borderRadius: '0.35rem'}}
          >
            { new Intl.NumberFormat("de-DE").format(row.original.state)}
          </span>, 
        //Cell: ({ renderedCellValue }) => <span style={{ color: 'red', backgroundColor: '#EEE', padding:'1px 10px'}}>{renderedCellValue}</span>, // use renderedCellValue instead of cell.getValue()
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableRowNumbers: true,
    //rowNumber: {size: 200},
    rowNumberDisplayMode: 'original', // 'static', // default

    displayColumnDefOptions: {
      'mrt-row-numbers': {
        size: 40,
        visibleInShowHideMenu: false, //hide this column from the show hide menu
      },
      'mrt-row-select': {
        size: 40,
      },
    },
    enableStickyHeader: true,
    //muiTableContainerProps: { sx: { maxHeight: '800px' } },

    enableColumnResizing: true,
    columnResizeMode: 'onEnd', //instead of the default "onChange" mode
    muiSelectCheckboxProps: {
      color: 'secondary', //makes all checkboxes use the secondary color
    },
    initialState: { 
      density: 'compact', 
      pagination: { pageSize: 10, pageIndex: 0 },
      //showGlobalFilter: true,
    },
    //customize the MRT components
    muiPaginationProps: {
      rowsPerPageOptions: [5, 8, 10, 15, 20, 50, 100],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',//'default'
    //baseBackgroundColor: '#A62',
  });

  return <MaterialReactTable table={table} />;
};

export default BasicTab;
