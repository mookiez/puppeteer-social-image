import { compileTemplate, resolveParams } from ".";

const buildStyles = ({
  background = "black",
  imageUrl,
  color = "white",
  fontFamily = '"Lato", Arial',
  additionalStyles = ""
} = {}) => `
${additionalStyles}

.Image {
  width: 100%;
  height: 100%;
  background-size: cover;  
  background-repeat: no-repeat;
  background-origin: center;
}

.Main {
  background: ${imageUrl ? "transparent" : background};
  position: relative;
  width: 100%;
  height: 100%;
}

.Inner {
  background: ${imageUrl ? "transparent" : background};
  color: ${color};
  font-family: ${fontFamily};
  width: 100%;
  height: 100%;
}

.Watermark {
  color: white;
  font-family: ${fontFamily};
  font-size: 24px;
  position: absolute;
  opacity: 0.8;
  right: 8px;
  bottom: 8px;
}

.Watermark-logo {
  font-weight: 900;
}
`;

export default ({ body, styles, templateParams, ...params }) =>
  compileTemplate({
    body: `
      <div class="Main">
        {{#if imageUrl}}
          <div class="Image" style="background-image: {{#if backgroundImageOverlay}}linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), {{/if}}url('{{imageUrl}}');" />
        {{/if}}

        <div class="Inner">
          ${body}
        </div>
        {{#if includeWatermark}}
        <div class="Watermark">
          {{#if watermarkUrl}}Generated by <span class="Watermark-logo">{{watermarkUrl}}</span>{{/if}}
          {{#if watermark}}{{watermark}}{{/if}}
        </div>{{/if}}
      </div>
`,
    styles: buildStyles(
      resolveParams(
        {
          ...templateParams,
          additionalStyles: styles
        },
        params.size
      )
    ),
    templateParams: { ...templateParams, googleFont: "Lato" },
    ...params
  });
