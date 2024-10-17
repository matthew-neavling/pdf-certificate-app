import { Response } from "express";
import muhammara from "muhammara";

interface PdfArgs {
    first: string
    last: string
    course: string
}

export function writePdf(response: Response, form: PdfArgs) {
    const title = `${form.first} ${form.last}`;
    const subtitle = `for completing the ${form.course} certificate course`;

    const writer = muhammara.createWriter(new muhammara.PDFStreamForResponse(response), {
        version: muhammara.ePDFVersion13
    })

    const font = writer.getFontForFile('public/fonts/arial.ttf');
    const page = writer.createPage(0, 0, 842, 595);

    const {posX, posY} = centerText(page, font, 40, title);

    writer.startPageContentContext(page)
        .writeText(`This certificate is awarded to`, centerText(page, font, 12, `This certificate is awarded to`).posX, 400, { font: font, size: 12 })
        .writeText(title, posX, posY, { font: font, size: 40 })
        .writeText(subtitle, centerText(page, font, 12, subtitle).posX, 200, {font:font, size:12 })
        .drawRectangle(10, 250, 822, 100, {color:'black', type:'stroke'})
        .drawCircle(60, 60, 50, { color: "#ff0000", close: false })

    writer.writePage(page);
    writer.end();
}

export function createPdfFile(){ 
    
}

function centerText(page:muhammara.PDFPage, font:muhammara.UsedFont, size:number, text:string){
    const pageWidth = page.mediaBox?.[2] as number;
    const pageHeight = page.mediaBox?.[3] as number;

    const { width, height } = font.calculateTextDimensions(text, size);

    // const posX = pageWidth/2 - width/2;
    // const posY = pageHeight/2 - height/2;

    // return [posX, posY];
    return {posX:pageWidth/2 - width/2, posY:pageHeight/2 - height/2}
}

function fit(dimensions:muhammara.TextDimension){

}