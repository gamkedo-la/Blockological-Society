function updateMenu()
{

}

function menuEventHandler(evt)
{
    if (evt.keyCode == KEY_ENTER)
    {
        inMenu = false;

        document.getElementById('music').play();
        
    }
}