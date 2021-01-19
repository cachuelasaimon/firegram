import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Form Components
import { Formik, useField, Form } from 'formik'
import * as Yup from 'yup'

// Styling Components
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles' 
// Redux 
import { loginStart } from '../../redux/Actions'
import { useDispatch, useSelector } from 'react-redux'
const mapState = ({user}) => ({
    currentUser: user.currentUser,
})

const useStyle = makeStyles({
    margins: {
        marginBottom: "1rem",
    },
    btn: {
    },
    btnContainer: {
        marginTop: '0.5rem',
        width: "100%",
        height: "auto",
        display: 'grid',
        justifyItems: 'center',
    },
})

const CustomTextField = props => {
    const { label } = props
    const [field, meta] = useField(props)
    
    return(
        <Fragment>
            <TextField
                className={``}
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



export default function LoginForm ( props ) {
    const { currentUser } = useSelector(mapState)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyle()

    const handleSubmit = async ({email, password}) => {
        await dispatch(loginStart({email, password}))
    }

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

    return (
        <Fragment>
            <div className="card">
                <div className={`title`}>Login</div> 
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid Email')
                            .required('Required'),
                        password: Yup.string()
                            .min(3, 'Minimum of 3 characters')
                            .max(20, 'Maximum of 20 chracters')
                            .required('Required'),     
                    })}
                    onSubmit={async (values, {resetForm})=>{
                       await handleSubmit(values)
                       resetForm()                      
                    }}
                >
                    {props=>(
                        <Form>
                            <CustomTextField 
                                className={`${classes.margins}`}
                                type="email"
                                name="email"
                                label="Email" />

                            <CustomTextField 
                                type="password"
                                name="password"
                                label="Password" />
                            <a className="forgot-password-link" 
                                href="forgot-password">
                                Forgot Password?</a>

                            <CustomButton 
                                type="submit"
                                content="Login"
                                color="secondary" />
                        </Form>
                    )}
                </Formik>
            </div>
        </Fragment>
    )
}


