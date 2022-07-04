import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <script
                        type="text/javascript"
                        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7yBiZnU4SohA7t59eWxFK4KLEsN51_9U&libraries=places"
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument