import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Form Components
import { Formik, useField, Form } from 'formik'
import * as Yup from 'yup'

// Styling Components
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import './style.scss'

// Redux 
import { signUpStart } from '../../redux/Actions' 
import { useDispatch, useSelector } from 'react-redux'
const mapState = ({user}) => ({
    currentUser: user.currentUser
})

const useStyle = makeStyles({
    margins: {
        marginBottom: "1rem",
    },
    btn: {
    },
    btnContainer: {
        width: "100%",
        height: "auto",
        display: 'grid',
        justifyItems: 'center',
    },
})

const CustomTextField = props => {
    const { label } = props
    const classes = useStyle()
    const [field, meta] = useField(props)
    
    return(
        <Fragment>
            <TextField
                className={`${classes.margins}`}
                label={label}
                size="small"
                variant="outlined"
                {...field}
                {...props}
                error={meta.touched && meta.error}
                helperText={ meta.touched ? meta.error : '' }

                fullWidth />
        </Fragment>
    )
}

const CustomButton = props => {
    const { content, color, type } = props
    const classes = useStyle()
    return (
        <Fragment>
           <div className={`${classes.btnContainer}`}>
           <Button
                className={`${classes.btn}`}
                variant="contained"
                color={color}
                type={type}
                size="small"
                 >
                {content}
            </Button>
           </div>
        </Fragment>
    )
}



export default function SignInForm ( props ) {
    const { currentUser } = useSelector(mapState)
    const dispatch = useDispatch()
    const classes = useStyle()
    const history = useHistory()

    useEffect(()=>{
        if(currentUser) {
            props.setPage('/firegram')
        }
    },[currentUser])
    useEffect(() => {
        if(currentUser){
            props.setPage('/firegram')
        }
    },[])

    const handleSubmit = ({email, password, displayName}) => {
        dispatch(signUpStart({email, password, displayName}))
    }

    return (
        <Fragment>
            <div className="card">
                <div className="title">
                    Create an Account</div>
                <Formik
                    initialValues={{
                        displayName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object({
                        displayName: Yup.string()
                            .min(6, 'Minimum of 6 characters')
                            .max(20, 'Maximum of 20 characters')
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid Email')
                            .required('Required'),
                        password: Yup.string()
                            .min(3, 'Minimum of 3 characters')
                            .max(20, 'Maximum of 20 chracters')
                            .required('Required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password')], "passwords don't match")
                            .required('Required'),          
                    })}
                    onSubmit={ async(values, {resetForm}) => {
                            await handleSubmit(values)
                            resetForm()
                            console.log(props)
                        }}
                >
                    {props=>(
                        <Form>
                            <CustomTextField 
                                type="text"
                                name="displayName"
                                label="Username" />

                            <CustomTextField 
                                type="email"
                                name="email"
                                label="Email" />

                            <CustomTextField 
                                type="password"
                                name="password"
                                label="Password" />

                            <CustomTextField 
                                type="password"
                                name="confirmPassword"
                                label="Confirm Password" />

                            <CustomButton 
                             type="submit"
                             content="Sign up"
                             color="primary" />
                        </Form>
                    )}
                </Formik>
            </div>
        </Fragment>
    )
}


