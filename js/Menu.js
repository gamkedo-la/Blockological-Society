function updateMenu()
{

}

function menuEventHandler(evt)
{
    if (evt.keyCode == KEY_ENTER)
    {
        inMenu = false;

        musicTrack.loopSong("music/rooftops_by_mcfunkypants_lofi");
    }
}
