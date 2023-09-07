export function tin(n){
    if(n<10)
      return "0"+n
    return n.toString()
  }
  
  
export async function nextEvent(){
    var c = await Calendar.forEvents();
    
    var ev = undefined;
    var td = await CalendarEvent.today(c);
    var thisW = await CalendarEvent.thisWeek(c);
    var nextW = await CalendarEvent.nextWeek(c);
    
    var text = undefined;
    
    var now = Date.now();
    
    if(td.length){
      ev = td[0];
      text = "Today";
    }else if(thisW.length){
      thisW.forEach((e)=>{
        if(ev)
          return;
        if(e.startDate>now)
          ev = e;
      });
    }else if(nextW.length)
      ev = nextW[0];
      
    if(!ev)
      return undefined;
        
    var et = ev.title;
    
    var ey = ev.startDate.getFullYear();
    var em = ev.startDate.getMonth();
    var ed = ev.startDate.getDate();
    
    if(!text)
      text = tin(ed)+"."+tin(em)+"."+ey;
    
    return {
      title:et,
      year:ey,
      month:em,
      day:ed,
      form:text,
      raw:ev
    }
  }