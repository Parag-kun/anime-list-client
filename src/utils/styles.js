import { makeStyles } from '@material-ui/core/styles'

export const useHomeStyles = makeStyles(theme => ({
    container: {
        
    },
    filter: {
        minWidth: 180
    },
    menu: {
        padding: '20px 50px',
        '& > *': {
            display: 'flex',
            justifyContent: 'center',
            padding: 10
        },   
        [theme.breakpoints.down('sm')]: {
            '& > * > *': {
                width: '100%'
            },
            padding: 0
        }
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: 10
        }
    },
    disable: {
        pointerEvents: 'none',
        color: 'grey',
        '&::after': {
            content: '"Cant rate if not watching or watched already"',
            fontSize: 12,
            paddingLeft: 6
        }
    },
    dialogFilter: {
        minWidth: 250
    }
}))

export const useAnimeListStyles = makeStyles(theme => ({
    container: {
        padding: 20,
        [theme.breakpoints.down('xs')]: {
            padding: 10
        }
    },
    menu: {        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        '& > *': {
            minWidth: 150
        }
    }
}))

export const useAnimeCardStyles = makeStyles(theme => ({
    root: {
        borderRadius: '6px',
        [theme.breakpoints.up('xs')]: {
            height: 300,
            width: '100%',
            flexDirection: 'column',
            margin: '10px auto',
        },        
        [theme.breakpoints.up('sm')]: {
            height: 500,
            width: '80%',
            flexDirection: 'column'
        },
        [theme.breakpoints.up('lg')]: {
            height: 250,
            width: '98%',
            flexDirection: 'row',
            margin: '20px auto',
        },
        display: 'flex',
        boxShadow: '0px 0px 8px gray, inset 0px 0px 2px gray',
        position: 'relative'     
    },
    media: {
        width: '30%',
        height: '100%',
        [theme.breakpoints.up('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            height: '100%',
            width: '40%'
        },
    },
    content: {
        [theme.breakpoints.up('xs')]: {

        },
        [theme.breakpoints.up('lg')]: {
            width: '60%',

        },
    },
    title: {
        [theme.breakpoints.up('xs')]: {
            marginBottom: 5
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: 20
        },
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
    },
    ratingTwo: {
        display: 'flex',
        
    },
    icon: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 'medium'
        }
    },
    select: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 'small'
        }
    },
    formControl: {
        minWidth: 90
    },
    disable: {
        pointerEvents: 'none',
        color: 'grey',
    },
    delete: {
        position: 'absolute',
        top: 0,
        left: 0
    }
}))