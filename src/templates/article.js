import { createImageTemplate } from "../helpers";

export default ({
  templateParams: { eyebrow, title, subtitle, ...imageTemplateParams },
  ...params
}) =>
  createImageTemplate({
    ...params,
    body: `
      <div class="Content">
        <div class="Content-inner">
          ${eyebrow ? `<div class="Eyebrow">${eyebrow}</div>` : ""}
          <h1><strong>${title}</strong></h1>
          ${subtitle ? `<h2>${subtitle}</h2>` : ""}
          </div>
        </div>
      </div>
    `,
    styles: `
      .Content {
        align-items: center;
        display: flex;
        height: 100%;
      }
      
      .Content-inner {
        padding: 64px;
        padding-top: 48px;
      }
      
      .Eyebrow {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 8px
      }
      
      h1, h2 {
        margin: 0;
        padding: 0;
        font-weight: 400;
        line-height: 1.2;
      }
      
      h1 {
        font-size: 96px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      
      h2 {
        font-size: 40px;
      }
    `,
    templateParams: imageTemplateParams
  });