/* [ ---- Beoro Admin - file manager ---- ] */

    $(document).ready(function() {
        //* file manager
        beoro_fileManager.inputBox();
        beoro_fileManager.wysiwg_fileManager();
    });

    //* datatables
    beoro_fileManager = {
        inputBox: function() {
            if($('#fm_inputBox').length) {
                $('#fm_inputBox').next('button').click(function(e) {
                        e.preventDefault();
                        window.KCFinder = {
                            callBack: function(url) {
                                $('#fm_inputBox').val(url);
                                window.KCFinder = null;
                            }
                        };
                        window.open('file_manager/browse.php?type=image', 'kcfinder_textbox',
                            'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
                            'resizable=1, scrollbars=0, width=800, height=600'
                        );
                })
            }
        },
        wysiwg_fileManager: function() {
            if($('#wysiwg_manager').length) {
                //* WYSIWG Editor
                CKEDITOR.replace( 'wysiwg_manager', {
                    toolbar: 'Standard',
                    filebrowserBrowseUrl: 'file_manager/browse.php?type=files',
                    filebrowserUploadUrl: 'file_manager/upload.php?type=files',
                    filebrowserImageBrowseUrl: 'file_manager/browse.php?type=image',
                    filebrowserImageUploadUrl: 'file_manager/upload.php?type=image',
                    filebrowserFlashBrowseUrl: 'file_manager/browse.php?type=flash',
                    filebrowserFlashUploadUrl: 'file_manager/upload.php?type=flash',
                    extraPlugins: 'autogrow',
                    forcePasteAsPlainText: true
                });
            }
        }
    };