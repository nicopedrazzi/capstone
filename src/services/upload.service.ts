import { PDFParse } from "pdf-parse";


export async function parseUploadedPdfFile(/*path:string*/){
    //i guess I can put S3 bucket link here, for now let's put the path
    const parser = new PDFParse({ url: 'https://bitcoin.org/bitcoin.pdf' });
    const result = await parser.getText()
    console.log("testing: if you see this you are logged in and have permission to upload!")
}

