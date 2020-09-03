import React from 'react'
import Header from './Header'


export default props =>
    <React.Fragment>
        <Header { ... props} />
        <main className="main">
            <div className="mt-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>