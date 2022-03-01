(function submitForm() {
    // select our form
    let form = $('form[id="my-post-form"]');
    // add a submit handler to our form, so we can prevent
    // the default submit action from happening.
    form.submit(function(event) {
        // prevent form from its normal submit action
        event.preventDefault();
        // select out input value for this form.
        let input = form.find('input[name="input-field"]').val();
        // let's also get the action attribute of the form
        let action = form.attr('action');
        // and now, we can finally assemble and submit our
        // form data using jQuery and Ajax
        console.log(input, action);
        $.ajax({
            type: 'post',
            url: action,
            dataType: 'json',
            data: JSON.stringify({api: input}),
            contentType: 'application/json; charset=utf-8',
        })
        // happens on success, note: if you are using a jQuery version
        // earlier than 3.4 then done might be called success.
        .done(function(data, status, jqxhr) {
            // add the result to the output area
            // console.log("done -> ", data, status, jqxhr);
           $('div[id="post-example-output"]').text(data.api.received.api);//.empty().append();
        })

        // happens on error, note: if you are using a jQuery version
        // earlier than version 3.4 then fail might be called error.
        .fail(function(jqxhr, status, error) {
            //$('div[id="post-example-output"]').empty().append(e.responseText);
            console.log('fail -> ', jqxhr, status, error);
        })
        // happens always
        .always(function(e) { /* do nothing for now */ });
    });
})();
//submitForm();
