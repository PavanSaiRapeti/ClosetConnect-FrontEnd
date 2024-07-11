module.exports = {
    // Other webpack configurations
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgo: true,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                dimensions: false,
                template: ({ template }, opts, { imports, componentName, props, jsx, exports }) => {
                  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
                  return typeScriptTpl.ast`
                    ${imports}
                    import * as React from 'react';
                    const ${componentName} = (${props}) => {
                      return ${jsx};
                    };
                    export default ${componentName};
                  `;
                },
                throwIfNamespace: false, // Add this line to bypass the warning for namespace tags
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
  };