import React from 'react'
import './error.css'

const Error = ()=>{

    const handleClick = ()=>{
        window.location='/'
    }

    return(
        <div className='error-wrapper'>
        <div className="error">
            <div className="wrap">
                <div className="404">
                    <pre><code>
                        <span className="green">&lt;!</span><span>DOCTYPE html</span><span className="green">&gt;</span><br/>
                        <span className="orange">&lt;html&gt;</span><br/>
                        <span className="orange">&lt;style&gt;</span><br/>
                        *&#123;<br/>
                            <span className="green">everything</span>:<span className="blue">awesome</span>;<br/>
                        &#125;<br/>
                        <span className="orange">&lt;/style&gt;</span><br/>
                        <span className="orange">&lt;body&gt;</span> <br/>
                            ERROR 403!<br/>
                                ACCESS DENIED!<br/>
                        <span className="comment">&lt;!--The file you are looking for, 
                                            is not something you are authorized to visit.--&gt;
                        </span><br/>
                        <span className="orange"></span> 
                        <br />
                        <span className="info">
                            <br />
                            <span className="orange">&nbsp;&lt;/body&gt;</span>
                            <br/>
                            <span className="orange">&lt;/html&gt;</span>
                        </span>
                    </code></pre>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Error;