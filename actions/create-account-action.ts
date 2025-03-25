"use server"

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string [],
    success: string
}

export  async function register (prevState: ActionStateType, formData: FormData) {
    //Creando objeto para enviar al backend
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    }
    

    // validar 
    const register = RegisterSchema.safeParse(registerData)
    //si succes es false hay errores
    if(!register.success) {
    const errors = register.error.errors.map(error => error.message)
        return {
            errors,
            success: prevState.success
        }
    }

    // registrar usuario
    const url = `${process.env.API_URL}/auth/create-account`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: register.data.name,
            password: register.data.password,
            email: register.data.email
        })
    })
    
    const json = await req.json()
    if(req.status === 409) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: '' //se manda un string vacio, no aparece en el formulario cuando buscas un email igual

        }
    }

    const success = SuccessSchema.parse(json)

    //Retorna si todo esta bien
    return {
        errors: [], //Retorna con arreglo vacio no hay errores
        success
        
    }

}