import { Grid } from '@mui/material'
import React from 'react'
import SideBar from '../Sidebar'

type Props = {
    children: React.ReactNode
}

const Layout = (props: Props) => {
    const {children} = props
  return (
    <Grid container height={"100vh"} width={"100vw"} maxHeight={"100vh"} overflow={"auto"} position={"relative"} padding={0} margin={0}>
        <Grid item md={3} sm={3} lg={3} xs={2} height={"100%"} maxHeight={"100vh"} overflow={"auto"} sx={{left:0,bottom:0,top:0,position:"static"}} padding={0} margin={0}>
            <SideBar/>
        </Grid>
        <Grid item md={9} sm={9} lg={9} xs={10}maxHeight={"100vh"} overflow={"auto"}>{children}</Grid>
    </Grid>
  )
}

export default Layout