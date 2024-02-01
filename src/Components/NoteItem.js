import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae fuga culpa quibusdam velit, ducimus nobis? Ipsam inventore iure beatae perferendis esse consequatur debitis eligendi veniam? Ducimus, nihil. Molestias, facilis est!</p>
                    <a href="#" class="btn mx-2 btn-success">Edit Note</a>
                    <a href="#" class="btn  btn-danger">Delete Note</a>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
