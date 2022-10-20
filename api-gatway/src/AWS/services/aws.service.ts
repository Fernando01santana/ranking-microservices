import * as aws from 'aws-sdk'

export class AwsService{
    async uploadFile(file:any,_id:string){
        
        const s3 = new aws.S3({
            region:process.env.AWS_REGION,
            accessKeyId:process.env.AWS_ACESS_KEY_ID,
            secretAccessKey:process.env.AWS_SECRET_ACESS_KEY
        })


        const extensionFile = file.originalname.split('.')[1]
        const nameFile = `${_id}.${extensionFile}`

        const params = {
            Body:file.buffer,
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:nameFile
        }

        const data = await s3.putObject(params)
        .promise()
        .then(
            data =>{
                return {url:`https://buketcurso.s3.sa-east-1.amazonaws.com/${nameFile}`}
            },
            err => {return err})                                 
        return data
                                        
                                    
    }
}