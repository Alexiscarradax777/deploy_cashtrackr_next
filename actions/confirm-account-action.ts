
"use server"

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}


export async function confirmAccount( token: string, prevState: ActionStateType) {
  
    //Validacion
    const confirmToken = TokenSchema.safeParse(token)
    if(!confirmToken.success) {
        return {
            errors: confirmToken.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    // Confirmar el usuario
    const url = `${process.env.API_URL}/auth/confirm-account`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: confirmToken.data
        })
    })

    const json = await req.json()
    //Verificar que Obtenemos une error 
    if(!req.ok) {
        
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
   
  // Si todo esta bien
  const success = SuccessSchema.parse(json)
  return {
    errors: [],
    success
  }
}
