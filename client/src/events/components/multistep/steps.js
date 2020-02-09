import React from 'react'
import StepOne from './stepOne'
import StepTwo from './stepTwo'
import StepThree from './stepThree'
import StepFour from './stepFour'

const steps = 
    [
      {name: 'Details', component: <StepOne />},
      {name: 'Location', component: <StepTwo/>},
      {name: 'Optional Information', component: <StepThree/>},
      {name: 'Agreement', component: <StepFour/>}
    ]

export { steps }