import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

function InfoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography color="error">
                    {title}
                </Typography>
                <Typography color="textPrimary">
                    +{cases}
                </Typography>
                <Typography color="primary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
