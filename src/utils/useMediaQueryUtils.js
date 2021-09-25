
import { useMediaQuery } from '@material-ui/core'

function useMediaQueryUtils(sizes) {
    
    const screens = [useMediaQuery('(min-width:0px)'), useMediaQuery('(min-width:600px)'), useMediaQuery('(min-width:960px)'), useMediaQuery('(min-width:1280px)'), useMediaQuery('(min-width:1920px)')]
    let size = null

    screens.forEach((screen, index) => {
        if (screen) size = sizes[index]
    })    

    return size
}

export default useMediaQueryUtils