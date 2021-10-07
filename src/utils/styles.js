import { makeStyles } from '@material-ui/core/styles'

export const useHomeStyles = makeStyles(theme => ({
    container: {
        padding: 5,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 40
        }
    },
    filter: {
        minWidth: 100,
        fontSize: 10,
        marginLeft: 18
    },
    menu: {
        position: 'sticky',
        top: 6,
        zIndex: '1',
        height: '7vh',
        '& > * + *': {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            '& > * + * > *': {
                marginTop: 8
            }
        },
        backgroundColor: 'rgb(0 0 0 /0.2)',
        backdropFilter: 'blur(8px)',
        borderRadius: 20
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: '0px 3px',
            fontSize: '15px'
        },
        position: 'sticky',
        top: '0px',
    },
}))

export const useAnimeListStyles = makeStyles(theme => ({
    container: {
        padding: 5,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 40
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
    action: {
        position: 'absolute',
        top: -5,
        left: -5
    }
}))

export const useUserStyles = makeStyles(theme => ({
    container: {
        padding: 5,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 40
        }
    },
    tab: {
        position: 'sticky',
        top: '5px',
        height: '5vh',
        display: 'flex',
        justifyContent: 'space-around',
        '& > *': {
            display: 'flex',
            justifyContent: 'center',            
            '& > *': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',                
            }
        },
        backgroundColor: 'rgba(0 0 0 /0.2)',
        backdropFilter: 'blur(8px)',
        borderRadius: 10,
        zIndex: 1
    },
}))

export const useUserCardStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        boxShadow: '0px 0px 50px #cfcfcf, inset 0px 0px 2px gray',
        borderRadius: 20,
        backgroundColor: 'white',
        margin: '5px 0px'
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: '0px 3px',
            fontSize: '15px'
        },
        position: 'sticky',
        top: '0px',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: 2,
            padding: '5px 8px',
            border: 'none',
            borderRadius: 5,
            transition: 'transform 0.1s',
            transitionTimingFunction: 'ease-out',
            textDecoration: 'none',
            '&:active': {
                transform: 'scale(0.95)'
            }
        }
    }
}))

export const useLayoutStyles = makeStyles(theme => ({
    tab: {
        position: 'fixed',
        bottom: '0px',
        height: '6vh',
        display: 'flex',
        justifyContent: 'space-around',
        '& > *': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 5,
            '& > *': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'black',
                '&:active': {
                    color: 'white',
                },
                '& > *': {
                    pointerEvents: 'none'
                }
            },
        },
        backgroundColor: 'white',
        borderRadius: 10
    },
    icon: {
        height: 70,
        width: 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        '& > *': {
            fontSize: 60
        },        
        borderRadius: '50%',     
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
    },
}))

export const useSearchStyles = makeStyles(theme => ({
    container: {
        padding: 5,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 40
        }
    },
    tab: {
        position: 'sticky',
        top: '5px',
        height: '5vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0 0 0 /0.2)',
        backdropFilter: 'blur(8px)',
        borderRadius: 10,
        zIndex: 1
    },
    option: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: '0px 5px'
        },
        position: 'absolute',
        left: 5,
    },
    search: {
        padding: 5,
        position: 'absolute',
        right: 0,
        '& > * + *': {
            position: 'absolute',
            right: 0,
            marginTop: 1,
            marginRight: 5
        },
    },
    searchInput: {
        width: '100%',
        height: '100%',
        padding: 5,
        borderRadius: 10,
        border: 'none',
        transition: 'box-shadow 0.2s',
        '&:focus': {
            outline: 'none',
            boxShadow: '0px 0px 10px 1px gray'
        }
    }
}))